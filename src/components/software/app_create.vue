<template>
  <el-row v-loading='loading'>
    <el-col :span='24' class='step-box'>
      <el-steps :active='active' simple>
        <el-step title='Create App' icon='el-icon-plus'></el-step>
        <el-step title='Config App' icon='el-icon-edit'></el-step>
        <el-step title='Success' icon='el-icon-circle-check-outline'></el-step>
      </el-steps>
    </el-col>
    <component :is='curComponent' :totalDat='form_dat' @step1='firstStep' @step2='secondStep'></component>
  </el-row>
</template>

<script>
  import { createApp } from '@/api/api.js'
  import step1 from '@/components/software/appstep/step1'
  import step2 from '@/components/software/appstep/step2'
  import step3 from '@/components/software/appstep/step3'

  let thisVue = null

  export default {
    data(){
      return {
        active: 1,
        curComponent: 'step1',
        isSubmit: false,
        loading: false,
        form_dat: {
          description: '',
          display_name: '',
          image: '',
          name: '',
          vendor_id: ''
        }
      }
    },
    methods: {
      firstStep(data)
      {
        thisVue.active = data.active;
        thisVue.curComponent = data.curComponent;
        let {name, description, display_name, vendor_id} = data.form_dat;
        thisVue.form_dat = {name, description, display_name, vendor_id};
      },
      secondStep(data)
      {
        if (data.active) {
          thisVue.active = data.active
          thisVue.curComponent = data.curComponent;
        } else {
          thisVue.form_dat.image = data.form_dat.image_name; 
          thisVue.isSubmit = data.isSubmit;
        }
      }
    },
    components: {step1, step2, step3},
    watch: {
      isSubmit: {
        handler: (val, oldVal) => {
          if (thisVue.isSubmit) {
            let params = {application: thisVue.form_dat}
            thisVue.loading = true
            createApp(params).then(json => {
              thisVue.loading = false
              if (json.data.status == 'success') {
                thisVue.active = 3
                thisVue.curComponent = 'step3'
              } else if (json.data.status == 'fail') {
                thisVue.$message({message: json.data.message, type: 'error'})
              }
            }).catch(err => {
              thisVue.loading = false
              return false
            })
          }
        },
        deep: true
      }
    },
    mounted () {
      thisVue = this
    }
  }
</script>

<style>
  @import url('../../assets/style/create.css');
</style>