import { QuestionButtonComponent } from '../components/question-button';
import { Component } from '../helpers/component';
import './index.scss';
import template from './template.html';
import { birdsData } from '../constants/birds-data';
import { WishComponent } from '../components/wish';
import { AnswerComponent } from '../components/answer';
import { AnswerStatus } from './constants';
import { SelectedAnswerComponent } from '../components/selected-answer';
import birdPlaceholder from '../assets/bird-placeholder.jpg';
import errorMp3 from '../assets/error.mp3';
import winMp3 from '../assets/win.mp3';
import { router, ROUTER_PATHS } from '../helpers/router';
import { resultsService } from '../helpers/results';

export class GamePage extends Component {
  constructor() {
    super({ template });
    this.state = {
      questionIndex: 5,
      questionsAll: birdsData,
      questions: birdsData[0],
      wishIndex: 0,
      wish: null,
      selectedIndex: null,
      isGuessed: false,
      totalScore: 0,
      score: 5,
    };
  }

  onMounted() {
    this.$questions = this.query('.questions');
    this.$wish = this.query('.wish');
    this.$answers = this.query('.answers');
    this.$selectedAnswer = this.query('.selected-answer');
    this.$next = this.query('.next');
    this.$results = this.query('.results');
    this.$totalScore = this.query('.total-score');

    this.createQuestionButtons();
    this.createWish();
    this.createAnswers();
    this.createSelectedAnswerStub();

    this.$next.addEventListener('click', () => {
      this.onClickNextQuestion();
    });

    this.$results.addEventListener('click', () => {
      router.setPage(ROUTER_PATHS.RESULTS);
    });
  }

  onUpdated() {
    this.$next.toggleAttribute('disabled', !this.state.isGuessed);
    this.$totalScore.innerText = 'Score: ' + this.state.totalScore;

    this.questionButtons.forEach((questionButton, index) => {
      questionButton.state = {
        isActive: this.state.questionIndex === index
      }
    });
  }

  onDestroyed() {
    this.wish.destroy();
    this.questionButtons.forEach((questionButton) => questionButton.destroy());
    this.selectedAnswer.destroy();
    this.answers.forEach((answer) => answer.destroy());
  }

  createQuestionButtons() {
    this.questionButtons = [];

    this.state.questionsAll.forEach((item, index) => {
      const component = new QuestionButtonComponent();
      component.state = {
        caption: item.caption,
        isActive: this.state.questionIndex === index,
      };
      component.render(this.$questions);
      this.questionButtons.push(component);
    });
  }

  createWish() {
    const wishIndex = this.generateWish(this.state.questions.data.length);
    const wish = this.getWish(wishIndex);

    this.wish = new WishComponent();
    this.wish.state = this.getWishStatePlaceholder(wish.audio);
    this.wish.render(this.$wish);

    this.state = {
      wishIndex,
      wish,
    };
  }

  createAnswers() {
    this.answers = [];
    this.state.questions.data.forEach((answer, index) => {
      const component = new AnswerComponent();
      component.state = {
        status: AnswerStatus.NOT_USED,
        name: answer.name,
        index,
      };
      component.on('click', (event) => {
        this.onAnswerClick(event);
      });
      component.render(this.$answers);
      this.answers.push(component);
    });
  }

  createSelectedAnswerStub() {
    this.$selectedAnswer.innerHTML = `
      <div>Послушайте плеер.</div>
      <div>Выберите птицу из списка.</div>
    `;
  }

  resetSelectedAnswerStub() {
    this.$selectedAnswer.innerHTML = '';
  }

  createSelectedAnswer() {
    this.selectedAnswer = new SelectedAnswerComponent();
    this.selectedAnswer.state = {
      answer: this.state.questions.data[this.state.selectedIndex],
    };
    this.selectedAnswer.render(this.$selectedAnswer);
  }

  generateWish(questionsLength) {
    return Math.floor(Math.random() * questionsLength);
  }

  getWish(wishIndex) {
    return this.state.questions.data[wishIndex];
  }

  onAnswerClick(event) {
    this.state.selectedIndex = event.index;
    const answerComponent  = this.answers[this.state.selectedIndex];
    const isGuessed = this.getIsGuessed();

    this.resetSelectedAnswerStub();
    this.createSelectedAnswer();

    if (isGuessed && !this.state.isGuessed) {
      console.log('this wish state = ')
      this.wish.state = {
        name: this.state.wish.name,
        image: this.state.wish.image,
      };
      this.addTotalScore();
    }

    if (answerComponent.state.status === AnswerStatus.NOT_USED && !this.state.isGuessed) {
      this.minusScore();
    }

    if (!this.state.isGuessed) {
      if (isGuessed) {
        this.showResultsButton();
        resultsService.data = { totalScore: this.state.totalScore };
      }

      this.state = {
        isGuessed,
      };
      
      const status = isGuessed ? AnswerStatus.OK : AnswerStatus.FAILED;

      answerComponent.state = {
        status,
      };

      this.playSound(status);

    }
  }

  minusScore() {
    let { score } = this.state;

    if (score > 0) {
      score -= 1;

      this.state = {
        score,
      };
    }
  }

  addTotalScore() {
    this.state = {
      totalScore: this.state.totalScore + this.state.score,
    };
  }

  getIsGuessed() {
    return this.state.selectedIndex === this.state.wishIndex;
  }

  playSound(status) {
    const src = status === AnswerStatus.FAILED ? errorMp3 : winMp3;
    const audio = document.createElement('audio');
    audio.src = src;
    audio.play();
    audio.volume = 0.5;
  }

  onClickNextQuestion() {
    const questionIndex = this.state.questionIndex + 1;
    const questionsLength = birdsData[questionIndex].data.length;
    const wishIndex = this.generateWish(questionsLength);
    const wish = birdsData[questionIndex].data[wishIndex];

    this.state = {
      questionIndex: questionIndex,
      questions: birdsData[questionIndex],
      wishIndex: wishIndex,
      wish: wish,
      selectedIndex: null,
      isGuessed: false,
      score: 5,
    };

    this.wish.state = this.getWishStatePlaceholder(this.state.wish.audio);

    this.destroyAnswers();
    this.createAnswers();

    this.selectedAnswer.destroy();
    this.createSelectedAnswerStub();
  }

  getWishStatePlaceholder(audio) {
    return {
      audio,
      image: birdPlaceholder,
      name: '******',
    }
  }
  
  destroyAnswers() {
    this.answers.forEach((answer) => answer.destroy());
  }

  showResultsButton() {
    this.$next.classList.remove('show');
    this.$results.classList.add('show');
  }
}
