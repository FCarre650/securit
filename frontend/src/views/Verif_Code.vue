<template>
    <div class="login-container">
        <div>
            <img src="../assets/images/logo.png" alt="logo"/>
        </div>
        <h2>Entrez le code de confirmation</h2>
        <form @submit.prevent="verif_code">
            <div class="form-group mb-2">
                <label for="code">Code</label>
                <div class="input-container">
                    <input id="code" name="code" type="text" placeholder="Ex: 1234" v-model="form_data.text" required>
                    <input type="hidden" name="email" value= "{{ email }}" v-model="form_data.email" >
                </div>
            </div>
            <p class="error"> {{ errorMessage }}</p>
            <button class="large-button" type="submit">Continuer</button>
        </form>
    </div>
</template>


<script setup>
/** 
    import { ref } from 'vue'
    import router from '../router'

    const form_data = ref({})
    const errorMessage = ref("")

    async function verif_code() {
        const response = await fetch('/auth/verif_code', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(form_data.value),
        })

        if (response.status === 200) {
            router.push('visite')
        } else if (response.status === 402) {
            errorMessage.value = "Code expiré"
        } else if (response.status === 403){
            errorMessage.value = "Code invalide"
        }
    }
*/

</script>