import React, {Component} from "react"
import "./assets/style.css";
import ReactDOM from "react-dom";
import quizService from "./quizService"
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Quizbee extends Component {

// State should always be located at the nearest parent. Store and use state data and make it easy to debug
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  getQuestions = () => {
    quizService().then(question =>{
      this.setState({
        questionBank: question
      });
    });
  };
  computeAnswer = (answer,correctAnswer) => {
    if (answer === correctAnswer){
      this.setState({
        score: this.state.score + 1
      });
    }
     this.setState({
       responses: this.state.responses < 5 ? this.state.responses +1 : 5
     });
     console.log("response",this.state.responses<5)
  };
  playAgain =() => {
    this.getQuestions();
    this.setState({
      score:0,
      responses:0
    })
  }
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <div className="title">Quizbee</div>
        {this.state.questionBank.length >0 &&
        this.state.responses < 5 &&
         this.state.questionBank.map(({question,answers,correct,questionId}) =>
         {
        return(
       
         <div>
          <QuestionBox 
          question={question} 
          options={answers} 
          key={questionId}
          selected={answer => this.computeAnswer(answer,correct)}
           />
         </div>
        )
        
     
       
        }
      
         
        )}

        {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>) : null}
      </div>
    );
  }
}


ReactDOM.render(<Quizbee/>,document.getElementById("root"));