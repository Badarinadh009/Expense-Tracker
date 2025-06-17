"use client"
import React, { useState } from 'react'


function Main() {
    const [text, setText]= useState('')
    const [amount, setAmount]=useState('')
    const [transaction, setTransaction]=useState([])
    const addTransaction=()=>{
        if(!text || !amount) return;
        const newTransaction= {
            text,
            amount: parseFloat(amount),
            id: Date.now()
        }
        setTransaction([newTransaction, ...transaction])
        setAmount('')
        setText('')
    }
    const deleteTransaction=(id)=>{
        const update= transaction.filter((tx)=>(tx.id!==id ))
        setTransaction(update)
    }
    const getBalance=()=>{
        return transaction.reduce((acc,tx)=>acc+tx.amount,0).toFixed(2)
    }
    const getIncome=()=>{
        return transaction.filter((tx)=>tx.amount >0 ).reduce((acc,tx)=>acc+tx.amount,0).toFixed(2)
    }
    const getExpense=()=>{
        return transaction.filter((tx)=>tx.amount<0).reduce((acc,tx)=>acc+tx.amount,0).toFixed(2)
    }
  return (
    <div className='grid grid-cols-2'>
        <div className='bg-yellow-400 w-[full] h-[100vh] flex flex-col p-4 items-center text-center'>
            <h1 className='font-bold text-3xl'>Expense Tracker</h1>
            <p>Enter the type of entry and the amount to add it to expense</p>
            <div className='h-[200px] flex items-end justify-center gap-6 pb-2'>
                <input className='border-2' type='text' placeholder='Enter the type' value={text} onChange={(e)=>setText(e.target.value)} />
                <input className='border-2' type='number' placeholder='Enter the amount' value={amount} onChange={(e)=>setAmount(e.target.value)} />
            </div>
            <button  className='bg-black w-[80px] text-white rounded-2xl'onClick={addTransaction}>Add</button>
        </div>
      <div className='bg-black text-amber-400 p-4'>
        <div className='flex justify-between font-bold text-xl h-[60px]'>
            <h1>Your total balance: {getBalance()}</h1>
            <h1>Your total Expense: {getExpense()}</h1>
            <h1>Your total Income: {getIncome()}</h1>
        </div>
        <ul className='grid grid-cols-3 pt-4'>
            {transaction.map((value, index)=>(
                <li key={index}><span>{value.text}</span>
                <span>{value.amount}</span>
                <span  className='cursor-pointer'onClick={()=>deleteTransaction(value.id)}>X</span></li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Main
