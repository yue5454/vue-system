<template>
  <el-row v-loading='loading'>
    <el-col :span='24'>
      <!-- steps -->
      <el-steps :space='200' :active='active' simple>
        <el-step title='Basic Infor' icon='iconfont icon-localoffer'></el-step>
        <el-step title='Source Code' icon='iconfont icon-localoffer'></el-step>
        <el-step title='Build Environment' icon='iconfont icon-localoffer'></el-step>
      </el-steps>
      <!-- form list -->
      <el-form ref='form' :model='form' label-width='80px' :rules='rules'>
        <!-- step one -->
        <div v-if='active==1'>
          <el-form-item label-width="130px" label='Solution Name' prop='solution'>
            <el-input size='small' v-model='form.solution'></el-input>
          </el-form-item>
          <el-form-item label-width="130px" label='Version' prop='version'>
            <el-col :span='23'><el-input size='small' v-model='form.version'></el-input></el-col>
            <el-col :span='1' class='tip-info'>
              <el-tooltip effect='dark' placement='left-start' content="Version names must be 2 to 255 characters. They can include the letters A-Z and a-z, the numbers 0-9, and the special characters - and _">
                <i class="iconfont icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label-width="130px" label='Model Name' prop='model_id'>
            <el-select size='small' v-model="form.model_id" placeholder='please select model'>
              <el-option v-for='(value, key) in models' :key='key' :value='value.id' :label="`${value.model}_${value.platform}_${value.type}_${value.vendor}`"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- step two -->
        <div v-if="active == 2">
          <el-form-item label-width="130px" label="Permission" prop='is_public'>
            <el-radio-group v-model="form.is_public">
              <el-radio label="false">Private</el-radio>
              <el-radio label="true">Public</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="130px" label="Tags" prop="tagsAttr">
            <el-select size='small' v-model="form.tagsAttr" multiple placeholder='please select tags'>
              <el-option v-for='(value, key) in tags' :key='key' :value='value.name' :label="value.name"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- step three -->
        <div v-if="active == 3">
          <el-form-item label-width="130px" label="Firmware" prop='sourceUploadMethod'>
            <el-radio-group size='small' v-model="form.sourceUploadMethod">
              <el-radio label="1" disabled>Upload Firmware Image</el-radio>
              <el-radio label="2">Specify Firmware Location</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Upload App Icon" prop='icon' v-if='form.sourceUploadMethod == 1'>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" v-model='form.image' multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">pull files here，or <em>click to choose files</em></div>
              <div class="el-upload__tip" slot="tip">Only JPG/PNG files can be uploaded with no more than 500kb</div>
            </el-upload>
          </el-form-item>

          <el-form-item label-width="130px" label='Image Url' prop='url' v-if='form.sourceUploadMethod == 2'>
            <el-col :span='23'><el-input size='small' v-model='form.url'></el-input></el-col>
            <el-col :span='1' class='tip-info'>
              <el-tooltip effect='dark' placement='left-start' content="Image url starts with 'https://s3-us-west-2.amazonaws.com/edgescale.org/release/ls1046ardb/dcca_lsdk1706-ls1046_image_sdboot.tgz'">
                <i class="iconfont icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
        </div>

        <el-form-item label-width="130px" class='opr-btn'>
          <el-button size='small' @click="cancel()">Cancel</el-button>
          <el-button type='primary' size='small' @click="active--" v-if="active > 1"><i class="el-icon-d-arrow-left"></i> Back</el-button>
          <el-button type='primary' size='small' @click="next('form')" v-if="active < 3">Next <i class="el-icon-d-arrow-right"></i></el-button>
          <el-button type='primary' size='small' @click="submitForm('form')" v-if="active == 3">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import { createSolution, getModelList, getTags } from '@/api/api.js'

  let thisVue = null

  export default {
    data(){
      return {
        form: {
          image: '',
          is_public: 'false',
          model_id: '',
          solution: '',
          sourceUploadMethod: '2',
          tagsAttr: [],
          url: '',
          version: '',
        },
        loading: false,
        models: [],
        tags: [],
        active: 1,
        rules: {
          solution: [
            { required: true, message: 'solution is required', trigger: 'blur' }
          ],
          version: [
            { required: true, message: 'version is required', trigger: 'blur' },
            { pattern: /^[-\w]+$/, min: 2, max: 255, message: 'Version names must be 2 to 255 characters. They can include the letters A-Z and a-z, the numbers 0-9, and the special characters - and _', trigger: 'blur'}
          ],
          model_id: [
            { required: true, message: 'model_id is required', trigger: 'change' }
          ],
          is_public: [
            { required: true, message: 'is_public is required', trigger: 'change' }
          ],
          tagsAttr: [
            { required: true, message: 'tagsAttr is required', trigger: 'change' }
          ],
          url: [
            { required: true, message: 'url is required', trigger: 'blur' },
            { min: 2, max: 255, message: 'length between 2 and 255', trigger: 'blur' },
            { pattern: /^(https:\/\/)[-.\/\w]+$/, message: "Image url starts with 'https://s3-us-west-2.amazonaws.com/edgescale.org/release/ls1046ardb/dcca_lsdk1706-ls1046_image_sdboot.tgz/'", trigger: 'blur' }
          ],
          image: [
            { required: true, message: 'image is required', trigger: 'blur' },
            { required: true, message: 'image is required', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        thisVue.$refs[formName].validate((valid) => {
          if(valid){
            thisVue.loading = true
            createSolution(thisVue.form).then(json => {
              thisVue.loading = false
              if (json.data.status == 'success') {
                thisVue.$message({type: 'success',message: 'create solution successfully'});
                thisVue.$router.push('/solution_list');
              } else {
                thisVue.$message.error(json.data.message);
              }
            }).catch(error => {
              thisVue.loading = false
              return false
            })
          } else {
            return false;
          }
        })
      },
      next (formName) {
        thisVue.$refs[formName].validate((valid) => {
          if (valid) {
            thisVue.active += 1
          } else {
            return false
          }
        })
      },
      getModels () {
        getModelList().then(json => {
          thisVue.models = json.data.models
        }).catch(err => {
          return false
        })
      },
      getTagList () {
        getTags().then(json => {
          thisVue.tags = json.data
        }).catch(err => {
          return false
        })
      },
      cancel () {
        thisVue.$confirm('are you sure to give up current operation?', 'cancel', {type: 'warning'}).then(() => {
          thisVue.$router.go(-1)
        }).catch(() => {
          return false
        })
      }
    },
    mounted () {
      thisVue = this
      thisVue.getModels()
      thisVue.getTagList()
    },
    watch: {
      form: {
        handler (curCal, oldVal) {
          console.log(1)
        },
        deep: true
      }
    }
  }
</script>
<style>
  @import '../../assets/style/create.css'
</style>