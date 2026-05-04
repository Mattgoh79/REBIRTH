<!-- 
 Use $state to manage an array of objects called cartItems, each with id, name, price and quantity properties
Use $state to manage form input data with properties itemName, itemPrice and itemQuantity
Use $derived to calculate totalPrice - the sum of price × quantity for all items
Use $effect to display a warning message when totalPrice exceeds $100, auto-hiding after 3 seconds
Use {#each} to display a table of all items with columns for name, price, quantity, item total and a remove button
Use {#if} and {:else} to display "Your cart is empty" when cartItems is empty
Add a form with input fields for item name, price and quantity using bind:value for two-way binding
Validate that the item name is not empty, price is a positive number and quantity is a positive integer
Use {#if} blocks to display validation error messages for invalid inputs
Clear the form after successful submission and prevent the default form submission behaviour
Generate unique IDs for new items using a counter
Display the total price formatted to 2 decimal places below the table -->

<script>
  let cartItems = $state([
    {id: 1, name: 'peanut', price: 1, quantity:2000},
    {id: 2, name: 'epipen', price: 10000, quantity:1}
  ]);

  //form input 
  let form = $state({
    itemName: '',
    itemPrice: '',
    itemQuantity: '',
  })

  //derived



</script>
