<template>
    <div class="login-container">
        <div>
            <img src="../assets/images/logo.png" alt="logo"/>
        </div>
        <h2>Création de compte</h2>
        <form action="created_account", method="POST">
            <div class="form-group mb-2">
                <label for="email">Email</label>
                <div class="input-container">
                    <span class="icon">@</span>
                    <input type="email" id="email" name="email" placeholder="Ex: abc@example.com" required>
                </div>
            </div>
            <div class="form-group mb-4">
                <label for="password">Mot de passe</label>
                <div class="input-container">
                    <span class="icon">🔒</span>
                    <input type="password" id="password" name="password" placeholder="********" minlength="8" required>
                </div>
            </div>
            <div class="form-group mb-4">
                <label for="passwordOk">Mot de passe (confirmer)</label>
                <div class="input-container">
                    <span class="icon">🔒</span>
                    <input type="password" id="passwordOk" name="passwordOk" placeholder="********" minlength="8" required>
                </div>
            </div>
            <p class="error"> <%= errorMessage %> </p>
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

</script>