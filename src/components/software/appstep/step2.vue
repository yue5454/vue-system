<template>
  <el-row v-loading='loading'>
    <el-col :span='24'>
      <el-form ref='form' :model='form' label-width='160px' :rules='rules'>
        <el-col :span='24'>
          <el-form-item label="Registry" prop='mirror_id'>
            <el-select size='small' placeholder='please input Registry' v-model='form.mirror_id'>
              <el-option v-for="item of mirrors" :key='item.id' :label='item.name' :value='item.name'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Image Name" prop='image_name'>
            <el-input size='small' placeholder='please input Image Name' v-model='form.image_name'></el-input>
          </el-form-item>
          <el-form-item label="Version" prop='version'>
            <el-input size='small' placeholder='please input version' v-model='form.version'></el-input>
          </el-form-item>
          <el-form-item label="Commands" prop='commands'>
            <el-input size='small' placeholder='please input commands' v-model='form.commands'></el-input>
          </el-form-item>
          <el-form-item label="Arguments" prop='args'>
            <el-input size='small' placeholder='please input args' v-model='form.args'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='24' class='opr-btn'>
          <el-form-item>
            <el-button size='small' type='primary' @click="goBack"><i class="el-icon-d-arrow-left"> Back</i></el-button>
            <el-button size='small' type='primary' @click="submit('form')">Submit <i class="el-icon-d-arrow-right"></i></el-button>
          </el-form-item>
        </el-col>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>

  import { getMirrorList } from '@/api/api.js'

  let thisVue = null

  export default {
    data(){
      return {
        form: {
          mirror_id: '',
          image_name: '',
          version: '',
          commands: '',
          args: ''
        },
        mirrors: [],
        loading: true,
        rules: {
          image_name: [
            { required: true, message: 'Please input Mode', trigger: 'blur' },
          ],
          version: [
            { required: true, message: 'Please input Type', trigger: 'blur' },
          ],
          mirror_id: [
            { required: true, message: 'Please select Registry', trigger: 'change' },
          ]
        }
      }
    },
    methods: {
      submit (formName) {
        thisVue.$refs[formName].validate((valid) => {
          if(valid){
            thisVue.$emit('step2', {isSubmit: true, form_dat: thisVue.form})
          }
          else{
            return false;
          }
        })
      },
      goBack () {
        thisVue.$emit('step2', {active: 1, curComponent: 'step1'})
      },
      getMirrors () {
        getMirrorList().then(json => {
          thisVue.loading = false
          thisVue.mirrors = json.data.mirrors
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      },
      handleAvatarSuccess (res, file) {
        console.log(res, file);
      },
      beforeAvatarUpload (file) {
        console.log(file);
      }
    },
    mounted () {
      thisVue = this
      thisVue.getMirrors()
    }
  }
</script>