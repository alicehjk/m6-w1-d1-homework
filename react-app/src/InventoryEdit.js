import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import AppNavbar from './Navbar';

class InventoryForm extends Component {
  defaultItem = {
    prodname: '',
    qty: '',
    price: '',
    status: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      inventory: this.defaultItem,
      isLoading: true
    };
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id && id !== 'new') {
      const response = await fetch(`/api/inventory/${id}`);
      const data = await response.json();
      this.setState({ inventory: data, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  updateField = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      inventory: { ...prev.inventory, [name]: value }
    }));
  };

  saveItem = async (e) => {
    e.preventDefault();
    const { inventory } = this.state;

    await fetch('/api/inventory', {
      method: inventory._id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inventory)
    });

    this.props.navigate('/inventories');
  };

  renderTitle() {
    return (
      <h2 className="mt-3">
        {this.state.inventory._id ? 'Edit Inventory' : 'New Inventory'}
      </h2>
    );
  }

  render() {
    const { inventory, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar />
        <Container>
          {this.renderTitle()}

          <Form onSubmit={this.saveItem}>
            <FormGroup>
              <Label for="prodname" className="h5 mt-3">Product Name</Label>
              <Input
                id="prodname"
                name="prodname"
                type="text"
                value={inventory?.prodname || ''}
                onChange={this.updateField}
              />
            </FormGroup>

            <FormGroup>
              <Label for="qty" className="h5 mt-3">Quantity</Label>
              <Input
                id="qty"
                name="qty"
                type="text"
                value={inventory?.qty || ''}
                onChange={this.updateField}
              />
            </FormGroup>

            <FormGroup>
              <Label for="price" className="h5 mt-3">Price</Label>
              <Input
                id="price"
                name="price"
                type="text"
                value={inventory?.price || ''}
                onChange={this.updateField}
              />
            </FormGroup>

            <FormGroup>
              <Label for="status" className="h5 mt-3">Status</Label>
              <Input
                id="status"
                name="status"
                type="select"
                value={inventory?.status || ''}
                onChange={this.updateField}
              >
                <option value="">Select...</option>
                <option value="S">Sale</option>
                <option value="T">Transport</option>
                <option value="R">Return</option>
              </Input>
            </FormGroup>

            <FormGroup className="mt-4">
              <Button color="primary" type="submit">Save</Button>
              <Button
                tag={Link}
                to="/inventories"
                color="secondary"
                className="ml-2"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

// Wrapper component to use hooks with class component
function InventoryEdit(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <InventoryForm {...props} params={params} navigate={navigate} />;
}

export default InventoryEdit;
