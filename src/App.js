import React, { Component } from "react";
import Statistics from "./components/Statistics/Statistics";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const result = good + neutral + bad;
    return result;
  };
  countPositiveFeedbackPercentage = () => {
    const result = this.countTotalFeedback();
    const { good } = this.state;
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  onLeaveFeedback = (e) => {
    const name = e.target.name;
    this.setState((prevState) => ({
      [name]: prevState[name] + 1,
    }));
  };

  render() {
    const total = this.countTotalFeedback();
    const Percentage = this.countPositiveFeedbackPercentage();
    const objKey = Object.keys(this.state);
    return (
      <>
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={objKey}
              onLeaveFeedback={this.onLeaveFeedback}
            />
          </Section>
          {total === 0 ? (
            <Notification message={"No feedback given"} />
          ) : (
            <Section title="Statistics">
              <Statistics
                good={this.state.good}
                neutral={this.state.neutral}
                bad={this.state.bad}
                onTotal={total}
                onPercentage={Percentage}
              />
            </Section>
          )}
        </div>
      </>
    );
  }
}

export default App;
