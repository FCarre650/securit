<template>
    <div class="login-container">
        <div>
            <img src="../assets/images/logo.png" alt="logo"/>
        </div>
        <h2>Connexion</h2>
        <form @submit.prevent="connexion">
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
            <p class="error"> {{errorMessage}} </p>
            <div class="mb-4">
                <button type="submit" class="large-button">Connexion</button>
            </div>
        </form>
        <div>
            <a href="register">Créer un compte</a>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import router from '../router'

    const form_data = ref({})
    const errorMessage = ref("")

    async function connexion() {
        const response = await fetch('/auth/connexion', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(form_data.value),
        })

        if (response.status === 200) {
            router.push('verif_code')
        } else {
            errorMessage.value = "Email ou mot de passe incorrect"
        }
    }

</script>