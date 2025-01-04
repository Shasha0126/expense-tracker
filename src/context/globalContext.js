import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:4000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([]);
    const [users,setUsers]=useState([]);
    const [error, setError] = useState(null)

    const loginUser = async (user) => {
        try {
            const response = await axios.post(`${BASE_URL}login`,user);
            const { token, user } = response.data; // Assuming the response contains a token and user details
            localStorage.setItem('authToken', token); // Save token to local storage
            setUsers([user]); // Update users state with the logged-in user
            return user; // Return the user for further use if needed
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            throw err; // Re-throw the error for handling in the component
        }
    };
    
    const addUser = async (user) => {
        try {
            const response = await axios.post(`${BASE_URL}adduser`, user);
            getUsers(); // Refresh user list after adding
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const getUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-users`);
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users.");
        }
    };
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-user/${id}`);
            getUsers(); // Refresh user list after deletion
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            addUser,
            getUsers,
            deleteUser,
            loginUser,
            users,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}