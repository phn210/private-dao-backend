import { Request, Response } from 'express';
import ethers from 'ethers';

import { IDAO } from '../models/DAO';
import { DAOService } from '../services/DAOService';
import { BadRequestError } from '../errors/http/BadRequestError';
import { NotFoundError } from '../errors/http/NotFoundError';
import { useFundManager, useDAOManager, useDAO } from '../../lib/networks/evm';

export class DAOController {

    private daoService: DAOService;
    private chainId: number = 11155111;

    constructor() {
        this.daoService = new DAOService();

        this.queryListDAOs = this.queryListDAOs.bind(this);
        this.queryFundingHistory = this.queryFundingHistory.bind(this);
        this.queryOneDAO = this.queryOneDAO.bind(this);
        this.createDAO = this.createDAO.bind(this);
    }

    public async queryListDAOs(req: Request, res: Response) {
        try {
            const daos = await this.daoService.findAll();
            let daosData: any = {};
            
            const daoManagerContract = useDAOManager(this.chainId);
            const fundManagerContract = useFundManager(this.chainId);
            if (daoManagerContract === undefined) throw new NotFoundError("Can not found DAOManager contract");
            if (fundManagerContract === undefined) throw new NotFoundError("Can not found FundManager contract");
            const numDAOs = await daoManagerContract.daoCounter();
            const existedDAO = await Promise.all([...Array(Number(numDAOs)).keys()].map(async (index: number) => daoManagerContract.daos(index)));

            if (!req.query.addresses) {
                await Promise.all(existedDAO.map((addr, index) => {
                    if (daos[index] === undefined) daosData[addr] = {};
                    else daosData[addr] = daos[index];
                }));
                res.send({'daos': daosData});
                return;   
            }
            
            const addresses = (req.query.addresses as string).toLowerCase().split(',');
            const selected = existedDAO.map((addr: string, index: number) => addresses.includes(addr.toLowerCase()) ? index : -1).filter(e => e >= 0);
            
            await Promise.all(selected.map(index => {
                if (daos[index] === undefined) daosData[existedDAO[index]] = {};
                else daosData[existedDAO[index]] = daos[index];
            }));

            res.send({'daos': daosData});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryFundingHistory(req: Request, res: Response) {
        try {
            const daos = await this.daoService.findAll();
            let daosData: any = {};
            
            const daoManagerContract = useDAOManager(this.chainId);
            const fundManagerContract = useFundManager(this.chainId);
            if (daoManagerContract === undefined) throw new NotFoundError("Can not found DAOManager contract");
            if (fundManagerContract === undefined) throw new NotFoundError("Can not found FundManager contract");
            const [numDAOs, numFundingRounds] = await Promise.all([
                daoManagerContract.daoCounter(),
                fundManagerContract.fundingRoundCounter()
            ]);
            const [existedDAO, listsDAOs, states] = await Promise.all([
                Promise.all([...Array(Number(numDAOs)).keys()].map(async (index: number) => daoManagerContract.daos(index))),
                Promise.all([...Array(Number(numFundingRounds)).keys()].map(async (index: number) => fundManagerContract.getListDAO(index))),
                Promise.all([...Array(Number(numFundingRounds)).keys()].map(async (index: number) => fundManagerContract.getFundingRoundState(index)))
            ]);

            const finalizedRounds = states.map((st, id) => Number(st) == 4 ? id : -1).filter(e => e >= 0);
            const fundedLists = listsDAOs.map((list, id) => finalizedRounds.includes(id) ? list : []);
            const validDAOs = [...new Set(fundedLists.flat())].map(addr => addr);

            const fundingHistory: {[key: string]: any} = {};
            validDAOs.map(dao => {
                Object.assign(fundingHistory, {[dao]: fundedLists.map((list, id) => list.includes(dao) ? id : -1).filter(e => e >= 0)});
            });
            const selected = existedDAO.map((addr: string, index: number) => validDAOs.includes(addr) ? index : -1).filter(e => e >= 0);        
            await Promise.all(selected.map(index => {
                if (daos[index] === undefined) daosData[existedDAO[index]] = {};
                else daosData[existedDAO[index]] = daos[index];
                Object.assign(daosData[existedDAO[index]], {
                    "fundingHistory": fundingHistory[existedDAO[index]]
                });
            }));
            
            res.send({"daos": daosData});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async queryOneDAO(req: Request, res: Response) {
        try {
            const { daoId } = req.params;
            const dao = await this.daoService.findOne(daoId);
            if (dao === undefined) throw new NotFoundError("DAO doesn't exist");
            
            res.send({"dao": dao});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

    public async createDAO(req: Request, res: Response) {
        try {
            const dao = req.body.dao;
            dao._id = Number(dao.daoId);
            
            const daoManagerContract = useDAOManager(this.chainId);
            if (daoManagerContract === undefined) throw new NotFoundError("Can not found DAOManager contract");

            const daoAddress = await daoManagerContract.daos(dao._id);
            dao.address = daoAddress || '';

            await this.daoService.save(dao);

            res.send({});
        } catch (error: any) {
            res.status(error.httpCode ?? 500).send(error);
        }
    }

}