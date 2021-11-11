<template>
  <select
    class="category-select"
    :value="selectedCategory"
    @change="$emit('selectCategory', $event.target.value)"
  >
      <option value="0">Any Category</option>
      <option value="9">General Knowledge</option>
      <option value="10">Books</option>
      <option value="11">Film</option>
      <option value="12">Music</option>
      <option value="13">Musicials and Theatres</option>
      <option value="14">Television</option>
      <option value="15">Video Games</option>
      <option value="16">Board Games</option>
      <option value="17">Science and Nature</option>
      <option value="18">Science: Computers</option>
      <option value="19">Science: Mathematics</option>
      <option value="20">Mythology</option>
      <option value="21">Sports</option>
      <option value="22">Geography</option>
      <option value="23">History</option>
      <option value="24">Politics</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="27">Animals</option>
      <option value="28">Vehicles</option>
      <option value="29">Entertainment: Comics</option>
      <option value="30">Science: Gadgects</option>
      <option value="31">Japanise Anime and Manga</option>
      <option value="32">Cartoon and Animations</option>
    </select>
</template>

<script>
export default {
    props: {
      selectedCategory: String,
    }
}
</script>

<style lang="scss">
  .category-select {
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    background-color: white;
    padding: 15px 10px;
    outline: none;
    margin-bottom: 40px;
    font-size: 1.2em;
    cursor: pointer;
  }
</style>