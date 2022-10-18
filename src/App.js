import React from 'react';
import FormComp from './components/form';

export default class App extends React.Component {
  constructor() {
    super();
    if (!localStorage.getItem('deposits'))
      localStorage.setItem('deposits', JSON.stringify([]));
    if (!localStorage.getItem('withdraws'))
      localStorage.setItem('withdraws', JSON.stringify([]));
    if (!localStorage.getItem('amount'))
      localStorage.setItem('amount', JSON.stringify(10000));
    this.state = {
      amount: JSON.parse(localStorage.getItem('amount')),
      withdrawList: JSON.parse(localStorage.getItem('withdraws')),
      depositList: JSON.parse(localStorage.getItem('deposits')),
    };
    this.updateAmount = this.updateAmount.bind(this);
    this.updateWithdraws = this.updateWithdraws.bind(this);
    this.updateDeposits = this.updateDeposits.bind(this);
    this.withdrawSubmit = this.withdrawSubmit.bind(this);
    this.depositSubmit = this.depositSubmit.bind(this);

    this.withdraws = this.state.withdrawList.map((item, index) => {
      return (
        <li key={index}>
          <h3>Name: {item.name}</h3>
          <h3>Amount: {item.amount}</h3>
        </li>
      );
    });
    this.deposits = this.state.depositList.map((item, index) => {
      return (
        <li key={index}>
          <h3>Name: {item.name}</h3>
          <h3>Amount: {item.amount}</h3>
        </li>
      );
    });
    this.totalDeposit = this.getTotalAmount(this.state.depositList);
    this.totalWithdraw = this.getTotalAmount(this.state.withdrawList);
    console.log(this.state.amount)
    console.log(this.totalWithdraw)
    console.log(this.totalDeposit)
  }
  componentDidUpdate(prevProp, prevState) {
    if (JSON.stringify(prevState.withdrawList) !== JSON.stringify(this.state.withdrawList)) {
      this.setState({ withdrawList: this.state.withdrawList });
      this.totalWithdraw = this.getTotalAmount(this.state.withdrawList);
      this.withdraws = this.state.withdrawList.map((item, index) => {
        return (
          <li key={index}>
            <h3>Name: {item.name}</h3>
            <h3>Amount: {item.amount}</h3>
          </li>
        );
      });
    }
    if (JSON.stringify(prevState.depositList) !== JSON.stringify(this.state.depositList)) {
      this.setState({ depositList: this.state.depositList });
      this.totalDeposit = this.getTotalAmount(this.state.depositList);
      this.deposits = this.state.depositList.map((item, index) => {
        return (
          <li key={index}>
            <h3>Name: {item.name}</h3>
            <h3>Amount: {item.amount}</h3>
          </li>
        );
      });
    }
  }
  render() {
    return (
      <>
        <div className='section-1'>
          <article>
            <ul>
              <li id="total-withdraw">
                <label htmlFor="total-withdraw">Total Withdraw</label>
                <h1>{this.totalWithdraw}</h1>  
              </li>
              <li id="amount">
                <label htmlFor="amount">Current Amount</label>
                <h1>{this.state.amount}</h1>
              </li>
              <li id="total-deposit">
                <label htmlFor="total-deposit">Total Deposit</label>
                <h1>{this.totalDeposit}</h1>
              </li>
            </ul>
          </article>
          <FormComp onSubmit={this.withdrawSubmit} title='Withdraw' />
          <FormComp onSubmit={this.depositSubmit} title='Deposit' />
        </div>
        <div className='section-2'>
          <figure>
            <h1>Withdraws:</h1>
            <ul className='withdraws'>{this.withdraws}</ul>
          </figure>
          <figure>
            <h1>Deposits:</h1>
            <ul className='deposits'>{this.deposits}</ul>
          </figure>
        </div>
      </>
    );
  }

  withdrawSubmit(payload) {
    if (this.state.amount < payload.amount) {
      alert('Insufficient funds');
      return;
    }
    const map = new Map();
    this.state.withdrawList.forEach((list) => {
      map.set(list.name, list.amount);
    });
    if (map.has(payload.name)) {
      alert('Name of transaction already exists');
      return;
    }
    this.updateAmount(this.state.amount - parseInt(payload.amount));
    this.updateWithdraws(payload);
  }

  depositSubmit(payload) {
    this.updateAmount(this.state.amount + parseInt(payload.amount));
    this.updateDeposits(payload);
  }

  updateAmount(newData) {
    localStorage.setItem('amount', JSON.stringify(newData));
    this.setState({ amount: newData });
  }

  updateWithdraws(newData) {
    const data = JSON.parse(localStorage.getItem('withdraws'));
    data.push(newData);
    localStorage.setItem('withdraws', JSON.stringify(data));
    this.setState((prevState) => ({
      withdrawList: [...prevState.withdrawList, newData],
    }));
  }

  updateDeposits(newData) {
    const data = JSON.parse(localStorage.getItem('deposits'));
    data.push(newData);
    localStorage.setItem('deposits', JSON.stringify(data));
    this.setState((prevState) => ({
      depositList: [...prevState.depositList, newData],
    }));
  }

  getTotalAmount(data) {
    let totalCount = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      totalCount += parseInt(item.amount);
    }
    return totalCount;
  }
}
