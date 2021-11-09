<script>
import Slider from '@vueform/slider';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { shuffleArr } from './helper';

export default {
components: {
  Slider
},
data() {
  return {
    selectedCategory: "0",
    questionsAmount: 10,
    selectedDifficulty: "any",
    isPlaying: false,
    sliderOptions: {
      min: 1,
      max: 50,
    },
    questions: [],
    correctAnswers: 0,
  }
},
methods: {
  startGame() {
    const amount = this.questionsAmount;
    const category = this.selectedCategory === "0" ? '' : `&category=${this.selectedCategory}`;
    const difficulty = this.selectedDifficulty === "any" ? '' : `&difficulty=${this.selectedDifficulty}`;

    this.fetchQuestions(amount, category, difficulty)
    this.isPlaying = true;
  },
  resetSettings() {
    this.selectedCategory =  "0";
    this.questionsAmount = 10;
    this.selectedDifficulty = "any";
    this.correctAnswers = 0;
  },
  stopGame() {
    this.resetSettings();
    this.isPlaying = false;
  },
  handleUserChoice(event, userAnswer, correctAnswer) {
    if (userAnswer ===  correctAnswer) {
      event.target.classList.add('user-select-btn_correct');
      this.correctAnswers = this.correctAnswers + 1;
    } else {
      event.target.classList.add('user-select-btn_incorrect');

      const listItem = event.target.closest('li');
      const btns = listItem.querySelectorAll('.user-select-btn');
  
      btns.forEach(el => {
        if (el.textContent === correctAnswer) {
          el.classList.add('user-select-btn_correct');
        }
      })
    }
  },
  async fetchQuestions(amount, category, difficulty) {
    const url = `https://opentdb.com/api.php?amount=${amount}${category}${difficulty}`;
    const response = await axios.get(url);

    // this.questions = response.data.results;

    const data = response.data.results;
    const result = [];

    for (let i = 0; i < data.length; i++) {
      result.push({
        question: data[i].question,
        answers: shuffleArr([...data[i].incorrect_answers, data[i].correct_answer]),
        correct_answer: data[i].correct_answer,
      })
    }

    this.questions = result;
  }
},
}
</script>

<template>
  <div class="container">
    <div class="content-wrapper" v-if="!isPlaying">
    <select v-model="selectedCategory">
      <option value="0">Any Category</option>
      <option value="9">General Knowledge</option>
      <option value="10">Books</option>
      <option value="11">Film</option>
      <option value="12">Music</option>
      <option value="13">Musicials and Theatres</option>
      <option value="14">Television</option>
      <option value="15">Video Games</option>
      <option value="16">Board Games</option>
      <option value="17">Science and Nature</option>
      <option value="18">Science: Computers</option>
      <option value="19">Science: Mathematics</option>
      <option value="20">Mythology</option>
      <option value="21">Sports</option>
      <option value="22">Geography</option>
      <option value="23">History</option>
      <option value="24">Politics</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="27">Animals</option>
      <option value="28">Vehicles</option>
      <option value="29">Entertainment: Comics</option>
      <option value="30">Science: Gadgects</option>
      <option value="31">Japanise Anime and Manga</option>
      <option value="32">Cartoon and Animations</option>

    </select>
    <span>Category</span>
    </div>

    <div class="content-wrapper" v-if="!isPlaying">
      <Slider v-model="questionsAmount" v-bind="this.sliderOptions" class="range-select" />
      <span>Number of questions</span>
    </div>

    <div class="content-wrapper" v-if="!isPlaying">
      <select v-model="selectedDifficulty">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="meduim">Meduim</option>
        <option value="hard">Hard</option>
      </select>
      <span>Difficulty</span>
    </div>

    <button type="button" @click="startGame" v-if="!isPlaying">Start game</button>

    <div v-else>
      <p>Score: {{ this.correctAnswers }} of {{ this.questionsAmount }}</p>
      <ul >
        <li v-for="item in this.questions" :key="item">
          <p type="button">{{ item.question}}</p>
          <button 
          type="button" 
          v-for="el in item.answers" 
          :key="el" 
          @click="handleUserChoice($event, el, item.correct_answer)"
          class="user-select-btn"
          >
            {{ el }}
          </button>
        </li>
      </ul>
      <button type="button" @click="stopGame">Stop game</button>
    </div>

  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content-wrapper {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  .range-select {
    margin-top: 40px;
    width: 50%;
  }

  .user-select-btn {
    transition: background-color 0.4s;

    &_correct {
      background-color: lightgreen;
    }

    &_incorrect {
      background-color: lightcoral;
    }
  }
</style>
