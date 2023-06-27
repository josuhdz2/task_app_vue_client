<template>
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        <h1>Ingresa datos</h1>
                    </div>
                    <div class="card-body">
                        <input type="email" placeholder="Email" class="form-control mb-3" v-model="email">
                        <input type="password" placeholder="Password" class="form-control" v-model="password">
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success btn-lg col-12" @click="login">Ingresar</button>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
    import {gql} from 'graphql-tag';
    import apolloProvider from '../../services/apolloService.js';
    import {ref} from 'vue';
    export default
    {
        data()
        {
            return {email:'', password:''}
        },
        methods:
        {
            async login()
            {
                
                var cadena=gql`mutation GetAuth($input:Login!){getAuth(input:$input)}`;
                try
                {
                    const input={input:{email:this.email, password:this.password}};
                    const {data}=await apolloProvider.defaultClient.mutate({mutation:cadena, variables:input});
                    console.log(data.getAuth)
                    if(data.getAuth!='failed')
                    {
                        localStorage.setItem('token', data.getAuth);
                        this.$router.push('/account');
                    }
                }
                catch(error)
                {
                    console.error(error);
                }
            }
        }
    }
    /*const email=ref("");
    const password=ref("");
    async function login()
    {
        var cadena=`mutation{getAuth(input:{password:"${}",email:"${}"})}`;
        const {data}=await apolloProvider.mutate({mutation:cadena})
    }
    function login()
    {
        console.log(email.value, password.value);
    }
    import gql from 'graphql-tag';
    import {ref} from 'vue';
    const email=ref();
    const password=ref();
    export default
    {
        methods:{
            login()
            {
                this.apollo.mutate({
                    mutation:gql`mutation{getAuth(input:{password:"$pass",email:"$em"})}`,
                    variables:{pass:password.value,em:email.value}
                })
                .then((res)=>
                {
                    console.log(response.data.getAuth)
                })
                .catch((err)=>
                {
                    console.log(err);
                });
            }
        }
    }*/
</script>