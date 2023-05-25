import { Router } from "express";
import { ProposalController } from "../controllers/ProposalController";

export class ProposalRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public route() {

        /**
         * swagger
         * /api/claims/metadata:
         *   get:
         *     summary: Fetch claim's metadata
         *     description: Fetch claim's metadata
         *     tags:
         *       - Claim
         *     parameters:
         *       - in: query
         *         name: claimId
         *         schema:
         *           type: string
         *         required: true
         *         description: Unique ID of claim
         *       - in: query
         *         name: schemaHash
         *         schema:
         *           type: string
         *         required: true
         *         description: Hash of schema
         *       - in: query
         *         name: issuerId
         *         schema:
         *           type: string
         *         required: true
         *         description: DID of Issuer
         *     responses:
         *       200:
         *         description: A JSON object
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 schema:
         *                   type: object
         *                   properties:
         *                     schemaHash:
         *                       type: string
         *                     title:
         *                       type: string
         *                 issuer:
         *                   type: object
         *                   properties:
         *                     issuerId:
         *                       type: string
         *                     endpointUrl:
         *                       type: string
         *                 provider:
         *                   type: object
         *                   properties:
         *                     name:
         *                       type: string
         */
        this.router.get('/proposals', (new ProposalController()).queryListProposals);

        this.router.get('/proposals/:proposalId', (new ProposalController()).queryOneProposal);

        this.router.post('/proposals', (new ProposalController()).createProposal);
    }
}