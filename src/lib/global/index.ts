// import { global as zidenParams } from "zidenjs/build";
// // const zidenParams = (async () => await import("zidenjs/build/global"))();

// export class GlobalVariables {
//     public static hasher: any;
//     public static F: any;
//     public static hash0: any;
//     public static hash1: any;
//     public static hashFunction: {
//         (left: BigInt, right: BigInt): BigInt;
//     };
//     public static eddsa: any;

//     constructor() {
//     }

//     public static async init(): Promise<void> {
//         // const zidenParams = await import('zidenjs/build/global.js');
//         await zidenParams.setupParams();
//         GlobalVariables.hasher = await zidenParams.buildHasher();
//         GlobalVariables.F = await zidenParams.buildSnarkField();
//         GlobalVariables.hash0 = zidenParams.buildHash0Hash1(GlobalVariables.hasher, GlobalVariables.F).hash0;
//         GlobalVariables.hash1 = zidenParams.buildHash0Hash1(GlobalVariables.hasher, GlobalVariables.F).hash1;
//         GlobalVariables.eddsa = await zidenParams.buildSigner();
//         GlobalVariables.hashFunction = zidenParams.buildFMTHashFunction(GlobalVariables.hash0, GlobalVariables.F);
//     }

// }