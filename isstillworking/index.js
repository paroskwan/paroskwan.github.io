var app = new Vue({
    el: '#app',
    data () {
      return {
        info: null
      }
    },
    mounted () {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      fetch("https://a.nacapi.com/inchpplcount/neo")
    .then(response => response.json())
    .then((data) => {
      const peopleMap = new Map(Object.entries(data.people));
      console.log(peopleMap)
      this.info= Array.from(peopleMap.values()).reduce(reducer)
    });

      // fetch("https://a.nacapi.com/inchpplcount/",{mode: 'cors'})
      // .then(response => response.json())
      // .then(this.info = response)
    }
  })

  Vue.component('todo-item', {
    props: ['todo'],
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })



  
  