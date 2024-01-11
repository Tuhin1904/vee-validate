<template>
   
    <div>
        <h1>Home Page</h1>
                <router-link to="/form">
                    <button>
                            Form
                    </button>
                </router-link>
                <router-link to="/APICall">
                    <button>
                            API 
                    </button>
                </router-link>
      </div>
</template>

<script>
export default{
    name:'HomePage'
}


</script>

<style>
        button{
            padding: 10px;
            border-radius: 0px;
            background: rgb(67, 66, 66);
            color:wheat;
            cursor:pointer;
            margin:0 1rem;
        }

</style>