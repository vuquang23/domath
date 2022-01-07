<template>
  <div class="study">
    <div>
      <router-link to="/">
        <img class="float-start" src="@/assets/deco/home.png" style="width: 1.8em; margin-left: 1em; margin-top: 0.5em; cursor: pointer;"/>
      </router-link>
    </div>
    
    <div class="container" style="padding-top: 1.5em;">
      <div class="row justify-content-center">
        <div class="col-7 quiz-page">
          <!-- Teaching -->
          <div v-if="page === 0">
            <div class="study-heading">
              <h1 class="fw-bold" style="color: #1ab394">{{ quizz["heading"] }}</h1>
            </div>
            <div style="margin-top: 2em; margin-bottom: 2em">
            <iframe class="ratio ratio-16x9 embeded-vid" width="620" height="380" :src="quizz['tutorial']['src']" allow="autoplay"></iframe>
            </div>
            <button class="button-74" @click="page = page + 1">Làm bài</button>
          </div>

          <!-- Do quizz -->
          <div v-if="page !== 0">
          <!-- Heading -->
            <div class="d-flex justify-content-center">
              <figure>
                <img class="change-answer" src="@/assets/deco/previous.png" style="margin-right: 1.5em;" @click="page=page-1; reset()"/>
              </figure>
              <p class="fw-bold display-6" style="color: #1ab394; padding-top: 0.5em;">Câu {{page}}</p>
              <figure v-if="quizz[`quiz-${page}`]['last-question'] === false">
                <img class="change-answer" src="@/assets/deco/next.png" style="margin-left: 1.5em;" @click="page=page+1; reset()"/>
              </figure>
            </div>
            <!-- Question -->
            <div>
              <p v-if="(category === 'tim-chuoi') && (quizz[`quiz-${page}`]['question']['type']==='img'||quizz[`quiz-${page}`]['question']['type']==='video')" 
                class="text-start fw-bold">
                  Em hãy trả lời câu hỏi trong ảnh/video bên dưới
              </p>
              <p v-if="category === 'doan-hinh'" class="text-start fw-bold">
                  Em hãy tìm hình tiếp theo với quy luật trong bức ảnh bên dưới
              </p>
              <iframe v-if="quizz[`quiz-${page}`]['question']['type']==='video'" 
                class="ratio quiz-vid"
                width="600" height="300" 
                :src="quizz[`quiz-${page}`]['question']['src']" 
                allow="autoplay"
              ></iframe>
              <img v-if="quizz[`quiz-${page}`]['question']['type']==='img'"  
                width="530" height="260" 
                :src="questionImgUrl()" />
              <div v-if="quizz[`quiz-${page}`]['question']['type']==='text'">
                <p v-for="(item, index) in quizz[`quiz-${page}`]['question']['content']" :key="index"
                  :class="{'text-start': !item['center'],'text-break': true, 'fw-bold': true}"
                  style="white-space: pre-line; margin-bottom: 0;"
                >
                  {{item['data']}}
                </p>
              </div>
            </div>
            <!-- Answer -->
            <div style="margin-top: 1em;">
              <p class="text-start fw-bold">Em hãy chọn đáp án đúng</p>
              <div class="container">
                <div class="row justify-content-center" style="margin-bottom: 0.8em;">
                  <div id="A" class="col-5 answer d-flex answer-left" :style="{'background-color': getBackgroundColor(0)}" @click="setAns(0)">
                    <span class="fw-bold">A.</span>
                    <div class="answer-content w-100">
                      <span v-if="quizz[`quiz-${page}`]['answer']['type']==='text'" class="fw-bold">
                        {{quizz[`quiz-${page}`]['answer']['answer'][0]}}
                      </span>
                      <figure v-if="quizz[`quiz-${page}`]['answer']['type']==='img'">
                        <img class="picture-answer" :src="imgUrl(0)"/>
                      </figure>
                    </div>
                  </div>
                  <div id="B" class="col-5 answer d-flex" :style="{'background-color': getBackgroundColor(1)}" @click="setAns(1)">
                    <span class="fw-bold">B.</span>
                    <div class="answer-content w-100">
                      <span v-if="quizz[`quiz-${page}`]['answer']['type']==='text'" class="fw-bold">
                        {{quizz[`quiz-${page}`]['answer']['answer'][1]}}
                      </span>
                      <figure v-if="quizz[`quiz-${page}`]['answer']['type']==='img'">
                        <img class="picture-answer" :src="imgUrl(1)"/>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div id="C" class="col-5 answer d-flex answer-left" :style="{'background-color': getBackgroundColor(2)}" @click="setAns(2)">
                    <span class="fw-bold">C.</span>
                    <div class="answer-content w-100">
                      <span v-if="quizz[`quiz-${page}`]['answer']['type']==='text'" class="fw-bold">
                        {{quizz[`quiz-${page}`]['answer']['answer'][2]}}
                      </span>
                      <figure v-if="quizz[`quiz-${page}`]['answer']['type']==='img'">
                        <img class="picture-answer" :src="imgUrl(2)"/>
                      </figure>
                    </div>
                  </div>
                  <div id="D" class="col-5 answer d-flex" :style="{'background-color': getBackgroundColor(3)}" @click="setAns(3)">
                    <span class="fw-bold">D.</span>
                    <div class="answer-content w-100">
                      <span v-if="quizz[`quiz-${page}`]['answer']['type']==='text'" class="fw-bold">
                        {{quizz[`quiz-${page}`]['answer']['answer'][3]}}
                      </span>
                      <figure v-if="quizz[`quiz-${page}`]['answer']['type']==='img'">
                        <img class="picture-answer" :src="imgUrl(3)"/>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Check answer -->
            <div>
              <div class="d-flex justify-content-center" style="margin-top: 2em;">
                <button class="button-53" @click="handleSubmitButton()">{{!check? "Kiểm tra đáp án" : "Làm lại"}}</button>
              </div>
            </div>
            <!-- View solution -->
            <div v-if="check" style="margin-top: 2em;">
              <div>
                <p class="text-start fw-bold" @click="viewSolution = viewSolution ^ 1" style="color: #1ab394; cursor: pointer;">Xem cách giải</p>
              </div>
              <div v-if="viewSolution" style="margin-top: 0;">
                <iframe class="ratio quiz-vid" width="600" height="300" :src="quizz[`quiz-${page}`]['solution']['src']" allow="autoplay"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuizzData from '../data/index.json'

const ASSETS = require.context('../assets')

export default {
  data() {
    return {
      category: null,
      quizz: null,
      page: 0,
      check: false,
      viewSolution: false,
      currentAns: null
    }
  },

  created() {
    this.$data.category = this.$route.params.category
    this.$data.quizz = QuizzData[this.$data.category]
  },

  methods: {
    reset() {
      this.$data.check = false
      this.$data.viewSolution = false
      this.$data.currentAns = null
    },

    imgUrl(id) {
      return ASSETS('./' + this.$data.quizz[`quiz-${this.$data.page}`]['answer']['answer'][id])
    },

    questionImgUrl() {
      return ASSETS('./' + this.$data.quizz[`quiz-${this.$data.page}`]['question']['src'])
    },

    setAns(id) { //id: [0, 1, 2, 3]
      if (this.$data.check === true) {
        return
      }
      this.$data.currentAns = id
    },

    checkAns() {
      if (this.$data.currentAns === null) {
        return
      }
      this.$data.check = true
    },

    getBackgroundColor(id) {
      const page = this.$data.page
      if (this.$data.check === false) {
        if (id === this.$data.currentAns) {
          return '#EBF460'
        }
        return null
      }

      if (id === this.$data.quizz[`quiz-${page}`]['answer']['true-answer']) {
        return '#1FA929'        
      } else if (id === this.$data.currentAns) {
        return '#E74630'
      }
    },

    handleSubmitButton() {
      if (!this.$data.check) {
        let src
        const page = this.$data.page
        if (this.$data.currentAns === this.$data.quizz[`quiz-${page}`]['answer']['true-answer']) {
          src = ASSETS('./sound/true.mp3')
        } else {
          src = ASSETS('./sound/false.mp3')
        }

        const audio = new Audio(src)
        audio.play()

        this.checkAns()
      } else {
        this.reset()
      }
    } 

  }
}
</script>

<style lang="scss">

// div, div > * {
//   border: 1px solid black;
// }

.study {
  background-image: linear-gradient(0deg, rgba(87, 95, 97, 0.7),rgba(239, 248, 248, 0.8)), url('../assets/deco/children1.jpg');
  background-size: cover;
  min-height: 100vh;
}

.study-heading {
  padding-top: 1.8em;
}

.change-answer {
  width: 1.5em; 
  height: 1.5em; 
  margin-top: 1.7em; 
  cursor: pointer;
}

.quiz-page {
  background-color: aliceblue;
  padding-bottom: 1.2em;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
}

.answer {
  cursor: pointer;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border: 1px solid #D0D4D9;
  background-color: #F2F2F2;
  border-radius: 2.5em;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
}

.answer-left {
  margin-right: 3em;
}

.answer-content {
  margin-left: 1em;
}

.picture-answer {
  width: 5.8em;
}

.embeded-vid {
  padding-left: 1em;
  padding-right: 1em;
}

.quiz-vid {
  padding-left: 2.3em;
  padding-right: 2.3em;
}

.button-53 { background-color: #3DD1E7; border: 0 solid #E5E7EB; box-sizing: border-box; color: #000000; display: flex; font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; font-size: 1rem; font-weight: 700; justify-content: center; line-height: 1.75rem; padding: .75rem 1.65rem; position: relative; text-align: center; text-decoration: none #000000 solid; text-decoration-thickness: auto; width: 100%; max-width: 460px; position: relative; cursor: pointer; transform: rotate(-2deg); user-select: none; -webkit-user-select: none; touch-action: manipulation; } .button-53:focus { outline: 0; } .button-53:after { content: ''; position: absolute; border: 1px solid #000000; bottom: 4px; left: 4px; width: calc(100% - 1px); height: calc(100% - 1px); } .button-53:hover:after { bottom: 2px; left: 2px; } @media (min-width: 768px) { .button-53 { padding: .75rem 3rem; font-size: 1.25rem; } }
.button-74 { background-color: #fbeee0; border: 2px solid #1ab394; border-radius: 30px; box-shadow: #1ab394 4px 4px 0 0; color: #1ab394; cursor: pointer; display: inline-block; font-weight: 600; font-size: 18px; padding: 0 18px; line-height: 50px; text-align: center; text-decoration: none; user-select: none; -webkit-user-select: none; touch-action: manipulation; } .button-74:hover { background-color: #fff; } .button-74:active { box-shadow: #422800 2px 2px 0 0; transform: translate(2px, 2px); } @media (min-width: 768px) { .button-74 { min-width: 120px; padding: 0 25px; } }
</style>