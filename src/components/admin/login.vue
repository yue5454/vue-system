<template>
  <el-row class='login-box'>
    <el-col :span='24' class='tit-box'>
      <div class='tit-2'>EDGESCALE</div>
      <div class='tit-1'>System Control</div>
    </el-col>
    <el-col :span='24'>
      <el-card class='card-box login-card'>
        <div class="form-box">
          <el-form :model='form' ref='form' :rules='rules' label-width='120px'>
            <el-col :span='24' style='text-align:center;'><i class="iconfont tit-3 icon-usered"></i></el-col>

            <el-col :span='24'>
              <el-input size='small' placeholder='please input username' prefix-icon='iconfont icon-login' v-model='form.username'></el-input>
            </el-col>

            <el-col :span='24'>
              <el-input size='small' type='password' placeholder='please input password' prefix-icon='iconfont icon-wodemima' v-model='form.password'></el-input>
            </el-col>

            <el-col :span='24' style='text-align: center;'>
              <el-button size='small' class='submit-btn' type='primary' @click="submitForm('form')">Login</el-button>
            </el-col>

            <el-col :span='24' style='text-align: center;'>
              <el-button size='small' class='link-btn' type='text' @click="$router.push('/register')">No account? Immediately regitstered</el-button>
            </el-col>
          </el-form>
        </div>
      </el-card>
    </el-col>
    <el-col :span='24' class='login-footer'>
      <p>© 2017. Copyright <span>edgescale.org</span> by <span>NXP</span></p>
    </el-col>
  </el-row>
</template>

<script>
  import { Login } from '@/api/api'

  export default {
    data(){
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please input FUID', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Push Button To Create DeviceNO', trigger: 'blur' },
          ],
        }
        
      }
    },
    methods: {
      login(){
        Login(this.form).then(json=>{
          let _data = json.data;
          this.$cookie.set('token', _data.token);
          this.$cookie.set('username', this.form.username);
          this.$router.push('/model_list');

        }).catch(err=>{
          console.log(err);
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.login();
          }
          else{
            return false;
          }
        })
      },
    },
    mounted(){
      let login_box = document.getElementsByClassName('login-box')[0];
      login_box.style.height = document.body.clientHeight + 'px';
    }
  }
</script>

<style scoped>
    @import '../../assets/style/admin.css'
</style>