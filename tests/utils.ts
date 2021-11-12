import { Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { Account, Connection, PublicKey, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js'
import assert from 'assert'

// Pubkey -> H7URR1ne1XUmA4jt2uGs3s3cq9jY7icNhELwJDj66MJt
export const predefinedAccount = new Account([54,149,88,28,99,246,232,98,6,203,98,102,143,165,
  118,22,69,57,167,26,115,96,38,207,142,226,127,200,60,236,244,224,170,26,185,179,
  73,140,194,74,55,172,110,197,123,85,1,222,73,166,173,205,147,229,39,74,96,
  203,85,45,179,81,116,17])
//1gqz2TU6RNri918e2SXme4XcsB1iXzaLeFpcmdGALGH
export const predefinedAccount2 = new Account([196,35,23,34,177,69,168,105,247,187,20,205,145,
  222,252,108,144,53,240,250,202,251,73,189,166,59,255,241,188,144,98,4,0,45,
  13,103,161,5,141,196,253,41,107,96,180,193,29,139,236,171,113,30,179,236,116,
  177,247,3,168,79,8,163,240,122])

export const new_account= new Account([50,15,177,89,97,129,237,190,85,237,180,7,155,202,
  210,41,98,139,94,200,114,245,173,86,236,254,237,56,204,240,90,123,218,28,124,243,53,31,
  137,108,131,45,226,200,213,143,176,25,71,238,248,108,26,111,219,65,249,137,164,9,114,37,129,67])
//C9D7x7NcSND41JEzYDXSvqPzSAFsrBZBVGkHcwteP8Le
export const predefinedAccount3= new Account([196,120,130,16,168,234,7,238,116,34,13,21,
192,88,217,78,95,193,209,150,159,224,185,107,39,32,2,26,244,153,251,73,165,
138,232,22,215,115,251,147,26,34,226,172,21,216,163,97,55,101,4,231,187,134,
99,163,88,55,67,47,70,201,29,15])

//HS2NhPrDJhxdUWY1qrYamMtRJthxh31a4w7gH7RULAK9
export const predefinedAccount4= new Account([134,3,134,127,103,103,255,223,151,85,
  191,6,55,97,152,160,190,21,15,221,9,202,205,30,103,216,247,222,253,193,180,47,
  244,36,16,145,158,100,4,159,128,249,98,167,0,16,130,164,74,185,225,110,206,
  103,231,107,38,125,170,103,253,51,227,136])


interface ICreateToken {
  connection: Connection
  payer: Account
  mintAuthority: PublicKey
  decimals?: number
}
export const createToken = async ({
  connection,
  payer,
  mintAuthority,
  decimals = 6
}: ICreateToken) => {
  const token = await Token.createMint(
    connection,
    payer,
    mintAuthority,
    null,
    decimals,
    TOKEN_PROGRAM_ID
  )
  return token
}

export async function assertThrowsAsync(fn: Promise<any>, regExp?) {
  let f = () => {}
  try {
    await fn
  } catch (e) {
    f = () => {
      throw e
    }
  } finally {
    assert.throws(f, regExp)
  }
}
