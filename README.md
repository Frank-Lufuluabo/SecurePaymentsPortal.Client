<h2 align="center">International Bank</h2>
<h3 align="center">This full-stack application is built with a React frontend that consumes data from an ASP.NET Core Web API backend</h3>

## About The Project

An internal international payment system for a major international bank. This system facilitates secure international payments through the bank's online banking platform.

## Customer Workflow

### Registration:
Customers must register on the online banking platform by providing:
- Full Name
- ID Number
- Account Number
- Password

### Login:
Customers log in using:
- Username
- Account Number
- Password

### Making a Payment:
1. Enter payment amount.
2. Select relevant currency.
3. Choose a payment provider (e.g., **SWIFT** for South African customers).
4. Provide recipient’s:
   - Account Information
   - SWIFT Code
5. Click **"Pay Now"** to finalize the request.

All transactions are securely stored in a protected database.

---

##  Employee Workflow (Bank Staff)

- Employees are **pre-registered** into the system at the time of employment.
- They must **log in** to the internal payments portal to:
  - View incoming customer transactions.
  - Verify payee details and SWIFT code.
  - Click the **"Verified"** button once the transaction is confirmed.
  - Finalize by clicking **"Submit to SWIFT"**.


## Installation
```bash
# Clone the repository
git clone https://github.com/Frank-Lufuluabo/SecurePaymentsPortal.Client.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Show your support

Give a ⭐️ if you like this project! 