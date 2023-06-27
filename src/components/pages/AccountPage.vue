<template>
    <h1 class="text-center mt-5 mb-3">Estas dentro de tu cuenta</h1>
    <div class="container">
        <button class="btn btn-success btn-lg col-12 my-2" data-bs-toggle="modal" data-bs-target="#registroModal">Agregar nueva tarea</button>
        <div class="card border-primary px-2">
            <div class="card border-success my-2" v-for="item in lista">
                <div class="row g-0 px-2 align-items-center">
                    <div class="col-9">
                        <div class="card-body">
                            <h4 class="card-title">{{ item.titulo }}</h4>
                            <p class="lead card-text">{{ item.descripcion }}</p>
                            <p class="card-text"><small class="text-muted">{{ Date(item.fechaVencimiento).toString() }}</small></p>
                            <span class="badge bg-success" v-if="item.estado!=false">Terminada</span>
                        </div>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-success btn-lg col-12 my-2" v-if="item.estado==false" @click="cambiarEstado(item._id)">Finalizada</button>
                        <button class="btn btn-danger btn-lg col-12 my-2" @click="eliminar(item._id)">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col"></div>
            <div class="col-6">
                <button class="btn btn-lg btn-outline-warning col-12" @click="logout()">Cerrar sesion</button>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Registrar nueva tarea</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <input type="text" placeholder="Titulo" class="form-control my-2" v-model="tarea.titulo">
                        <textarea class="form-control my-2" placeholder="Descripcion" v-model="tarea.descripcion"></textarea>
                        <input type="date" class="form-control my-2" placeholder="Fecha de vencimiento" v-model="tarea.fechaVencimiento">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cerrarModal">Cerrar</button>
                    <button type="button" class="btn btn-success" @click="registrar()">Registrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {gql} from 'graphql-tag';
    import Task from '../templates/Task.vue';
    import apolloProvider from '../../services/apolloService.js';
    export default
    {
        data()
        {
            return {lista:[], tarea:{titulo:"", descripcion:"", fechaVencimiento:"", idUsuario:localStorage.getItem('token')}};
        },
        async created()
        {
            this.obtenerTareas();
        },
        methods:
        {
            logout()
            {
                localStorage.removeItem('token');
                this.$router.push('/');
            },
            async obtenerTareas()
            {
                var cadena=gql`query($id:ID!){getTasks(_id:$id){titulo, descripcion, fechaVencimiento, estado, _id}}`;
                try
                {
                    const _id=localStorage.getItem('token');
                    const {data}=await apolloProvider.defaultClient.query({query:cadena, variables:{id:_id}, fetchPolicy:'no-cache'});
                    this.lista=data.getTasks;
                    console.log(this.lista)
                }
                catch(error)
                {
                    console.error(error);
                }
            },
            async cambiarEstado(idTask)
            {
                if(confirm("Estas seguro de finalizar la tarea"))
                {
                    var cadena=gql`mutation CompleteTask($input:TaskValidate!){completeTask(input:$input)}`;
                    try
                    {
                        const input={input:{userId:localStorage.getItem('token'), taskId:idTask}}
                        const {data}=await apolloProvider.defaultClient.mutate({mutation:cadena, variables:input});
                        if(data.completeTask!=false)
                        {
                            this.obtenerTareas();
                        }
                    }
                    catch(error)
                    {
                        console.log(error)
                    }
                }
            },
            async registrar()
            {
                if(this.tarea.descripcion && this.tarea.titulo && this.tarea.fechaVencimiento)
                {
                    console.log("campos lleno");
                    var cadena=gql`query($input:TaskInput){createTask(input:$input)}`;
                    try
                    {
                        const input={input:this.tarea};
                        const {data}=await apolloProvider.defaultClient.query({query:cadena, variables:input, fetchPolicy:'no-cache'});
                        if(data.createTask!=false)
                        {
                            alert('tarea creada con exito');
                            this.obtenerTareas();
                            document.getElementById('cerrarModal').click();
                        }
                    }
                    catch(error)
                    {
                        console.log(error)
                    }
                }
                else
                {
                    alert('Los campos no estan llenos')
                }
            },
            async eliminar(idTask)
            {
                if(confirm("Estas seguro de eliminar la tarea?"))
                {
                    var cadena=gql`query($input:TaskDelete){deleteTask(input:$input)}`;
                    try
                    {
                        const input={input:{idUsuario:localStorage.getItem('token'), _id:idTask}};
                        const {data}=await apolloProvider.defaultClient.query({query:cadena, variables:input, fetchPolicy:'no-cache'});
                        if(data.deleteTask!=false)
                        {
                            this.obtenerTareas();
                        }
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }
            }
        }
    }
</script>