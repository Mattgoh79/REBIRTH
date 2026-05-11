<script>
  import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    // @ts-ignore
    Col,
    Container,
    FormGroup,
    Input,
    // @ts-ignore
    Row,
    Table,
  } from '@sveltestrap/sveltestrap';

  // @ts-ignore
  let { data, form } = $props();
  let institutions = data.institutions.data;
  let message = data.institutions.message;
  let errors = form?.errors;
  let error = data.error;
  let tokenError = form?.error;
</script>

<Container class="mt-4">
  <h1 class="mb-4">Dashboard</h1>

  <Card class="mb-4">
    <CardHeader>Create Institution</CardHeader>
    <CardBody>
      <form method="POST" action="?/create">
        <FormGroup>
          <label for="name">Name</label>
          <Input id="name" name="name" type="text" value={form?.name ?? ''} placeholder="Enter name" />
        </FormGroup>

        <FormGroup>
          <label for="region">Region</label>
          <Input id="region" name="region" type="text" value={form?.region ?? ''} placeholder="Enter region" />
        </FormGroup>

        <FormGroup>
          <label for="country">Country</label>
          <Input id="country" name="country" type="text" value={form?.country ?? ''} placeholder="Enter country" />
        </FormGroup>

        <Button type="submit" color="primary">Submit</Button>
      </form>
    </CardBody>
  </Card>

  {#if form?.success}
    <Alert color="success">{form.message}</Alert>
  {/if}

  {#if form?.success === false}
    <Alert color="danger">{form.error}</Alert>
  {/if}

  {#if errors && errors.length > 0}
    <Alert color="warning">
      <ul class="mb-0">
        {#each errors as error}
          <li>{error.message}</li>
        {/each}
      </ul>
    </Alert>
  {/if}

  {#if error}
    <Alert color="danger">{error}</Alert>
  {/if}

  {#if tokenError}
    <Alert color="danger">{tokenError}</Alert>
  {/if}

  {#if institutions && institutions.length > 0}
    <h2 class="mb-3">Institutions</h2>
    <Table striped bordered>
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Region</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each institutions as institution}
          <tr>
            <td>{institution.name}</td>
            <td>{institution.region}</td>
            <td>{institution.country}</td>
            <td>
              <form method="POST" action="?/delete">
                <input type="hidden" name="id" value={institution.id} />
                <Button type="submit" color="danger" size="sm">Delete</Button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </Table>
  {:else if message}
    <p class="text-muted">{message}</p>
  {/if}
</Container>