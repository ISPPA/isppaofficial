<template>
  <section>
    <section v-if="!$store.state.fetchReadyAll" id="notReadyContainer">
      <FingerprintSpinner id="fingerprintSpinner"/>
    </section>
    <div v-else>
      <nuxt />
    </div>
  </section>
</template>
<script>
import FingerprintSpinner from '~/components/layout/loadingIndicator/FingerprintSpinner'
import '../assets/style/multiselect_custom.css'

export default {
  async mounted() {
    // Check available Disk Space
    let diskData =  await this.$checkDiskspace();
    if (diskData.freePercent <= 10) {
      this.$notification['warning']({
          duration: 0,
          message: 'Limited Disk Space Left',
          description:
            `The Disk is going to be full: ${diskData.freePercent.toFixed(2)}% left`,
      });
    };
  },
  components: {
    FingerprintSpinner
  }
}
</script>
<style>
body {
  background: #5e5e5e;
}
p {
  color: white;
  margin: 0;
}
code {
  font-family: 'Source Code Pro';
  background-color: #3e3e3e;
  color: lightgrey;
  border: 2px solid lightgrey;
  display: block;
  padding: 20px;
  text-align: left;
  line-height: 1.6;
  overflow-x: auto;
}
@namespace url("http://www.w3.org/1999/xhtml");

:root{
  scrollbar-color: grey lightgrey !important;
  scrollbar-width: thin !important;
}

* {
  scrollbar-width: thin !important;
}

::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: lightgrey;
}

::-webkit-scrollbar-thumb {
    background: grey;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

::-webkit-scrollbar-corner {
    background: lightgrey;
}

.deleteIcon:hover {
  color: red;
}
.addIcon:hover {
  color: lightgreen;
}

#notReadyContainer {
  color: white;
  height: 150vh;
  overflow: hidden;
  background: #2e2e2e;
  padding-top:5em;
}

#fingerprintSpinner {
  display: inline-block;
  position: absolute;
  left: -375px;
  margin-left: 50%;
  margin-top: 4em;
  animation: 1s appear;
}
.globeLogo{
  animation: scaleGlobe linear 2s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  -webkit-animation: scaleGlobe linear 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-transform-origin: 50% 50%;
  -moz-animation: scaleGlobe linear 2s;
  -moz-animation-iteration-count: infinite;
  -moz-transform-origin: 50% 50%;
  -o-animation: scaleGlobe linear 2s;
  -o-animation-iteration-count: infinite;
  -o-transform-origin: 50% 50%;
  -ms-animation: scaleGlobe linear 2s;
  -ms-animation-iteration-count: infinite;
  -ms-transform-origin: 50% 50%;
}

@keyframes scaleGlobe{
  0% {
    transform:  scaleX(1.00) scaleY(1.00) ;
  }
  50% {
    transform:  scaleX(2.00) scaleY(2.00) ;
  }
  100% {
    transform:  scaleX(1.00) scaleY(1.00) ;
  }
}

@-moz-keyframes scaleGlobe{
  0% {
    -moz-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  50% {
    -moz-transform:  scaleX(2.00) scaleY(2.00) ;
  }
  100% {
    -moz-transform:  scaleX(1.00) scaleY(1.00) ;
  }
}

@-webkit-keyframes scaleGlobe {
  0% {
    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  50% {
    -webkit-transform:  scaleX(2.00) scaleY(2.00) ;
  }
  100% {
    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;
  }
}

@-o-keyframes scaleGlobe {
  0% {
    -o-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  50% {
    -o-transform:  scaleX(2.00) scaleY(2.00) ;
  }
  100% {
    -o-transform:  scaleX(1.00) scaleY(1.00) ;
  }
}

@-ms-keyframes scaleGlobe {
  0% {
    -ms-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  50% {
    -ms-transform:  scaleX(2.00) scaleY(2.00) ;
  }
  100% {
    -ms-transform:  scaleX(1.00) scaleY(1.00) ;
  }
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
