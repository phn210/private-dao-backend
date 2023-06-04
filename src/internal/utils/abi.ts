import * as ethers from 'ethers'
import { Interface } from 'ethers/lib/utils'
import * as fs from 'fs'

export function getAbis(fileName: string): ethers.utils.Interface {
    let dataArray = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    return new Interface(dataArray)
}