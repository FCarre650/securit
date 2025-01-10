<template>
    <div class="login-container">
        <div>
            <img src="../assets/images/logo.png" alt="logo"/>
        </div>
        <h2>Entrez le code de confirmation</h2>
        <form action="/verif-code" method="POST">
            <div class="form-group mb-2">
                <label for="code">Code</label>
                <div class="input-container">
                    <input id="code" name="code" type="text" placeholder="Ex: 1234" required>
                    <input type="hidden" name="email" value= "<%= email %>" >
                </div>
            </div>
            <p class="error"> <%= errorMessage %> </p>
            <button class="large-button" type="submit">Continuer</button>
        </form>
    </div>
</template>


<script setup>

</script>