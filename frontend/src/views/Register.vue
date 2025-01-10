<template>
    <div class="login-container">
        <div>
            <img src="../assets/images/logo.png" alt="logo"/>
        </div>
        <h2>Création de compte</h2>
        <form @submit.prevent="created_account">
            <div class="form-group mb-2">
                <label for="email">Email</label>
                <div class="input-container">
                    <span class="icon">@</span>
                    <input type="email" id="email" name="email" placeholder="Ex: abc@example.com" v-model="form_data.email" required>
                </div>
            </div>
            <div class="form-group mb-4">
                <label for="password">Mot de passe</label>
                <div class="input-container">
                    <span class="icon">🔒</span>
                    <input type="password" id="password" name="password" placeholder="********" minlength="8" v-model="form_data.password" required>
                </div>
            </div>
            <div class="form-group mb-4">
                <label for="passwordOk">Mot de passe (confirmer)</label>
                <div class="input-container">
                    <span class="icon">🔒</span>
                    <input type="password" id="passwordOk" name="passwordOk" placeholder="********" minlength="8" v-model="form_data.password" required>
                </div>
            </div>
            <p class="error"> {{ errorMessage }} </p>
            <div class="mb-4">
                <button type="submit" class="large-button">Créer</button>
            </div>
        </form>
        <div>
            <a href="login">Connexion</a>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import router from '../router'

    const form_data = ref({})
    const errorMessage = ref("")

    async function created_account() {
        const response = await fetch('/auth/created_account', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(form_data.value),
        })

        if (response.status === 200) {
            router.push('validation')
        } else if (response.status === "") { 
            errorMessage.value = "Cet email est déjà utilisé"
        } else {
            errorMessage.value = "Les deux mots de passe sont différents"
        }
    }
</script>