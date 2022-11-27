class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    // Calculate the balance using the transaction objects.
    this.transactions.forEach((transaction) => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed() === true) {
      // Keep track of the time of the transaction
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;

    // // Add the transaction to the account

  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    return true; //just depositing
  }

}

class Withdrawal extends Transaction {

  get value() {
    return (-this.amount);
  }
  isAllowed() {
    if (this.amount - this.account.balance >= 0) {
      return true;
    }
    return false;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Michael Scott");
console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
