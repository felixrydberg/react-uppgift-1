import { Component } from "react"

export default class formComp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      amount: '',
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
  }
    render() {
      return (
        <form onSubmit={(event) => {event.preventDefault(); this.props.onSubmit({
          name: this.state.name,
          amount: this.state.amount,
          })}}>
          <h1>{this.props.title}</h1>
          <div>
            <input type="text" placeholder="Name of Transaction" onChange={this.onChangeName}></input>
            <input type="number" placeholder="Amount" onChange={this.onChangeAmount}></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      )
    }
    onChangeName(event) {
      this.setState({name: event.target.value})
    }
    onChangeAmount(event) {
      this.setState({amount: event.target.value})
    }
}