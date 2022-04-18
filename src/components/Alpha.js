import { Box, Paper, TextField, Button } from '@mui/material'
import { randomNumber } from '../shared/helpers'
import { useEffect, useState, useCallback } from 'react'
import { getWalletBalance } from '../shared/solana'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
} from '@solana/web3.js'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'

export const Alpha = ({ hasEditAccess, walletId }) => {
    const { wallet, publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()

    const [betAmount, setBetAmount] = useState(0)
    const [betRatio, setBetRatio] = useState(1)

    const generateRandomNumber = randomNumber(1, 8)
    console.log('generate', generateRandomNumber)

    useEffect(() => {
        const getBalance = async () => {
            const balance = await connection.getBalance(
                wallet.adapter.publicKey
            )
            console.log('balance', balance / LAMPORTS_PER_SOL)
            console.log('wallet', wallet.adapter.publicKey)
        }
        getBalance()
    }, [])

    const sendSol = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError()

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: '6pP1s6eGBpY7QKUnDdBtwi8M8CPtR61vUweW1ekQ8mEa',
                lamports: 1,
            })
        )

        const signature = await sendTransaction(transaction, connection)

        await connection.confirmTransaction(signature, 'processed')
    }, [publicKey, sendTransaction, connection])

    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    padding: '30px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <p
                    style={{
                        fontSize: '90px',
                        marginBottom: '-25px',
                        marginTop: '-20px',
                    }}
                >
                    🔮
                </p>
                <TextField
                    label="Bet ammount"
                    placeholder=""
                    margin="normal"
                    sx={{ marginRight: '16px', flexGrow: '1' }}
                    variant="outlined"
                    value={betAmount}
                    onChange={(input) => setBetAmount(input.target.value)}
                />
                <TextField
                    label="Ratio"
                    placeholder=""
                    margin="normal"
                    sx={{ marginRight: '16px', flexGrow: '1' }}
                    variant="outlined"
                    value={betRatio}
                    onChange={(input) => setBetRatio(input.target.value)}
                />
                <Button onClick={sendSol}>send sol</Button>
            </Paper>
        </Box>
    )
}
