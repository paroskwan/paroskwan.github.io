const reducer = (accumulator, currentValue) => accumulator + currentValue;
var app = new Vue({
  el: '#app',
  data() {
    return {
      currentInched: null,
      inchedList: null,
      totalNumber: null,
      numberList: null,
      inputInchedName:null,
      isInchedDisable : false,
      inputName: null,
      isDisable: false,
      wholeJson:null

    }
  },
  methods: {
    addValue: function (_name) {

      const _personIndex = this.numberList.findIndex(person => person.name === _name);
      const _person = this.numberList.find(person => person.name === _name);
      _person.count += 1;

      this.numberList[_personIndex] = _person;
      this.totalNumber = this.numberList.map(person => person.count).reduce(reducer,0)

      fetch("https://a.nacapi.com/inchpplcount2/" + currentInched, {
        method: 'post',
        body: JSON.stringify({ 'people': this.numberList })
      })
        .then(response => response.json())
        .then((data) => {

          const peopleList = data.neo.people
          this.totalNumber = peopleList.map(person => person.count).reduce(reducer,0)
          this.numberList = peopleList;
        });

    }
    ,
    addInchedPerson: function (_inputName) {
      this.isInchedDisable = true
      if (this.inchedList != null && _inputName != null && this.inchedList.find(person => person === _inputName) == null) {

        this.wholeJson[_inputName]={'people':[]}




        fetch("https://a.nacapi.com/inchpplcount2/", {
          method: 'post',
          body: JSON.stringify(this.wholeJson)
        })
          .then(response => response.json())
          .then((data) => {
            const _inchedList  = Object.keys(data);
        console.log(_inchedList);
        this.inchedList = _inchedList
            this.currentInched = _inputName;
            const peopleList = data.people;
            console.log(peopleList);
            this.totalNumber = peopleList.map(person => person.count).reduce(reducer,0)
            console.log(this.totalNumber);
            this.numberList = peopleList;
          });
      }
      this.isInchedDisable = false
    },
    addPerson: function (_inputName) {
      this.isDisable = true
      if (this.numberList != null && _inputName != null && this.numberList.find(person => person.name === _inputName) == null) {


        this.numberList.push({ 'name': _inputName, 'count': 0 })
        fetch("https://a.nacapi.com/inchpplcount2/" + + currentInched, {

          method: 'post',
          body: JSON.stringify({ 'people': this.numberList })

        })
          .then(response => response.json())
          .then((data) => {
            this.currentInched = _inputName;
            const peopleList = data.people;
            console.log(peopleList);
            this.totalNumber = peopleList.map(person => person.count).reduce(reducer,0)
            console.log(this.totalNumber);
            this.numberList = peopleList;
          });
      }
      this.isDisable = false
    }
    ,
    switchCurrentInched: function (_inchedName) {
      
      fetch("https://a.nacapi.com/inchpplcount2/" + _inchedName)
        .then(response => response.json())
        .then((data) => {
          this.currentInched = _inchedName;
          const peopleList = data.people;
          console.log(peopleList);
          this.totalNumber = peopleList.map(person => person.count).reduce(reducer,0)
          console.log(this.totalNumber);
          this.numberList = peopleList;
        });
    }




  },
  mounted() {

    fetch("https://a.nacapi.com/inchpplcount2/")
    .then(response => response.json())
      .then((data) => {

        const _inchedList  = Object.keys(data);
        console.log(_inchedList);
        this.inchedList = _inchedList
        console.log(this.inchedList)
        this.wholeJson = data
        console.log(data)

        var name = this.inchedList[0];
        this.currentInched = name;
        console.log(data[name].people)

        const peopleList = data[name].people;
        console.log(peopleList);
        this.totalNumber = peopleList.map(person => person.count).reduce(reducer,0)
        console.log(this.totalNumber);
        this.numberList = peopleList;


      })

    // fetch("https://a.nacapi.com/inchpplcount2/neo")
    //   .then(response => response.json())
    //   .then((data) => {

    //     const peopleList = data.people;
    //     console.log(peopleList);
    //     this.totalNumber = peopleList.map(person => person.count).reduce(reducer)
    //     console.log(this.totalNumber);
    //     this.numberList = peopleList;
    //   });

    // fetch("https://a.nacapi.com/inchpplcount/",{mode: 'cors'})
    // .then(response => response.json())
    // .then(this.info = response)
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})




