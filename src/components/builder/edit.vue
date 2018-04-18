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
          <el-form-item label-width="130px" label='Project' prop='name'>
            <el-col :span='23'><el-input size='small' v-model='form.name'></el-input></el-col>
            <el-col :span='1' class='tip-info'>
              <el-tooltip effect='dark' placement='left-start' content="Project names must be 2 to 255 characters. They can include the letters A-Z and a-z, the numbers 0-9, and the special characters - and _">
                <i class="iconfont icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-form-item>
          <el-form-item label-width="130px" label='Description' prop='description'>
            <el-input size='small' v-model='form.description'></el-input>
          </el-form-item>
        </div>
        <!-- step two -->
        <div v-if="active == 2">
          <div class='sorce-type'>
            <el-form-item label-width="130px" label="Source Provider" prop="sourceProvider">
              <el-select size='small' v-model="form.sourceProvider" @change="form.sourceParam1 = ''; form.sourceParam2 = ''">
                <el-option value='CodeCommit' label="CodeCommit">CodeCommit</el-option>
                <el-option value='S3' label="Amazon S3">Amazon S3</el-option>
                <el-option value='GitHub' label="GitHub">GitHub</el-option>
              </el-select>
            </el-form-item>

            <div v-if="form.sourceProvider == 'CodeCommit'">
              <el-form-item label-width="130px" label="Repository" prop="sourceParam1">
                <el-select size='small' v-model="form.sourceParam1" placeholder="please select Repository" @change='getBranch'>
                  <el-option v-for='(value, key) in repositories' :key='key' :label="value.repositoryName" :value="value.repositoryName"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="130px" label="Branch" prop="sourceParam2">
                <el-select size='small' v-model="form.sourceParam2" placeholder="please select Branch">
                  <el-option v-for='item in branches' :key='item' :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div v-if="form.sourceProvider == 'S3'">
              <el-form-item label-width="130px">
                <span>Specify your Amazon S3 location, such as s3://my-bucket/path/to/object.zip.</span>
              </el-form-item>
              <el-form-item label-width="130px" label="S3 Object Key" prop="sourceParam1">
                <el-input size='small' v-model="form.sourceParam1" placeholder='s3://my-bucket/path/to/object.zip'></el-input>
              </el-form-item>
            </div>

            <div v-if="form.sourceProvider == 'GitHub'">
              <el-form-item label-width="130px">
                <span>Specify your GitHub, such as https://github.com/Owner/Repo.git.</span>
              </el-form-item>
              <el-form-item label-width="130px" label="Repository" prop="sourceParam1">
                <el-input size='small' v-model="form.sourceParam1" placeholder='https://github.com/Owner/Repo.git'></el-input>
              </el-form-item>
              <el-form-item label-width="130px" label="Branch" prop="sourceParam2">
                <el-input size='small' v-model="form.sourceParam2"></el-input>
              </el-form-item>
            </div>

            <div v-if="form.sourceProvider != ''">
              <el-form-item label-width="130px" prop="pollForSourceChanges">
                <el-checkbox v-model='form.pollForSourceChanges'>check periodically for changes</el-checkbox>
              </el-form-item>
            </div>

          </div>
        </div>
        <!-- step three -->
        <div v-if="active == 3">
          <el-form-item label-width="130px" label="Environment">
            <el-radio-group v-model="imgType" @change="form.image = ''">
              <el-radio label="select">Image managed by AWS</el-radio>
              <el-radio label="input">Image from DockerHub</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label-width="130px" label="Image" prop="image" v-if="imgType == 'select'">
            <el-select size='small' v-model="form.image" placeholder="please select image">
              <el-option-group v-for='(value, key) in environments' :label='value.language' :key='value.language'>
                <el-option v-for='(item, index) in value.images' :key='index' :label="item.name" :value="item.name"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130px" label="Image" prop="image" v-if="imgType == 'input'">
            <el-input size='small' v-model="form.image" placeholder='<docker repository>/<docker image name>:<tag>'></el-input>
          </el-form-item>

          <el-form-item label-width="130px" label="Compute Type" prop="computeType">
            <el-select size='small' v-model="form.computeType" placeholder="please select computeType">
              <el-option label="3GB memory 2 vCPU" value="BUILD_GENERAL1_SMALL"></el-option>
              <el-option label="7GB memory 4 vCPU" value="BUILD_GENERAL1_MEDIUM"></el-option>
              <el-option label="15GB memory 8 vCPU" value="BUILD_GENERAL1_LARGE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130px" label="Timeout" prop="timeoutInMinutes">
            <el-input-number size='mini' v-model="form.timeoutInMinutes"></el-input-number>   mins
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
  import { updateBuilder, builderInfo, getEnvironments, getRepositories } from '@/api/api.js'

  let thisVue = null

  export default {
    data(){
      return {
        form: {
          name: '',
          description: '',
          sourceProvider: '',
          sourceParam1: '',
          sourceParam2: '',
          pollForSourceChanges: '',
          timeoutInMinutes: 40,
          image: '',
          computeType: ''
        },
        loading: false,
        project_id: null,
        repositories: [],
        environments: [],
        branches: [],
        imgType: null,
        active: 1,
        rules: {
          sourceProvider: [
            { required: true, message: 'sourceParam1 is required', trigger: 'change' }
          ],
          sourceParam1: [
            { required: true, message: 'sourceParam1 is required', trigger: 'change' }
          ],
          sourceParam2: [
            { required: true, message: 'sourceParam2 is required', trigger: 'change' }
          ],
          s3Object: [
            { required: true, message: 's3Object is required', trigger: 'blur' },
            { pattern: /^([S|s]3:\/\/)([\w.]*)$/, message: "s3 object key starts with 's3://'", trigger: 'blur' }
          ],
          timeoutInMinutes: [
            { required: true, message: 'timeoutInMinutes is required', trigger: 'change' }
          ],
          name: [
            { required: true, message: 'name is required', trigger: 'blur' },
            { min: 2, max: 255, message: 'length between 2 and 255', trigger: 'blur' },
            { pattern: /^[-\w]+$/, message: 'Project names must be 2 to 255 characters. They can include the letters A-Z and a-z, the numbers 0-9, and the special characters - and _', trigger: 'blur' }
          ],
          image: [
            { required: true, message: 'image is required', trigger: 'blur' },
            { required: true, message: 'image is required', trigger: 'change' }
          ],
          computeType: [
            { required: true, message: 'computeType is required', trigger: 'change' }
          ]
        },
        s3Object: [
          { required: true, message: 's3Object is required', trigger: 'blur' },
          { pattern: /^([S|s]3:\/\/)([\w./-]*)$/, message: "s3 object key starts with 's3://'", trigger: 'blur' }
        ],
        gitHubObject: [
          { required: true, message: 'repository is required', trigger: 'blur' },
          { pattern: /^(https:\/\/github.com\/)([\w.-]+)\/([\w.-]+.git)$/, message: "repository starts with 'https://github.com/Owner/Repo.git'", trigger: 'blur' }
        ],
        commandObject: [
          { required: true, message: 'repository is required', trigger: 'change' }
        ]
      }
    },
    methods: {
      submitForm(formName) {
        thisVue.$refs[formName].validate((valid) => {
          if(valid){
            thisVue.loading = true
            updateBuilder(thisVue.form).then(json => {
              thisVue.loading = false
              if (json.data.Success) {
                thisVue.$message({type: 'success',message: 'update project successfully'});
                thisVue.$router.push('/builder_list');
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
      getInfo () {
        let params = {project_id: thisVue.project_id}
        thisVue.loading = true
        builderInfo(params).then(json => {
          let {name, description, sourceProvider, sourceParam1, sourceParam2, pollForSourceChanges, timeoutInMinutes, image, computeType} = json.data
          thisVue.form = {name, description, sourceProvider, sourceParam1, sourceParam2, pollForSourceChanges, timeoutInMinutes, image, computeType}
          if (image.startsWith('aws/')) {
            thisVue.imgType = 'select'
          } else {
            thisVue.imgType = 'input'
          }
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      },
      getBranch (option) {
        thisVue.repositories.find(item => {
          if (item.repositoryName === option) {
            thisVue.branches = item.branches
          }
        })
      },
      getRepo () {
        getRepositories().then(json => {
          thisVue.repositories = json.data
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
        })
      },
      getEnviro () {
        getEnvironments().then(json => {
          thisVue.environments = json.data
          thisVue.loading = false
        }).catch(err => {
          thisVue.loading = false
          return false
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
      thisVue.project_id = thisVue.$route.params.id
      thisVue.getEnviro()
      thisVue.getRepo()
      thisVue.getInfo()
    },
    watch: {
      form: {
        handler (curCal, oldVal) {
          if (curCal.sourceProvider === 'S3') {
            thisVue.rules.sourceParam1 = thisVue.s3Object
          } else if (curCal.sourceProvider === 'GitHub') {
            thisVue.rules.sourceParam1 = thisVue.gitHubObject
          } else {
            thisVue.rules.sourceParam1 = thisVue.commandObject
          }
        },
        deep: true
      }
    }
  }
</script>
<style>
  @import '../../assets/style/create.css'
</style>