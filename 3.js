const { MongoClient } = require('mongodb');
const readline = require('readline');

class ShoppingComplex {
  constructor() {
    this.shops = [];
  }

  addShop(shop) {
    this.shops.push(shop);
  }

  getTotalRent() {
    let totalRent = 0;

    for (let shop of this.shops) {
      totalRent += shop.rent;
    }

    return totalRent;
  }
}

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const uri = 'mongodb+srv://aditya22:12345@clusteradi.yvgtwx7.mongodb.net/see?retryWrites=true&w=majority';
const databaseName = 'see';
const collectionName = 'see';

function createShop() {
  rl.question('Enter shop name: ', (name) => {
    rl.question('Enter shop rent: ', (rent) => {
      const shop = new Shop(name, parseInt(rent, 10));
      shoppingComplex.addShop(shop);

      rl.question('Do you want to add another shop? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
          createShop();
        } else {
          rl.close();
          const totalRent = shoppingComplex.getTotalRent();
          console.log('Total Rent:', totalRent);

          // Save the shopping complex to MongoDB
          saveShoppingComplex(shoppingComplex);
        }
      });
    });
  });
}

async function saveShoppingComplex(shoppingComplex) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Insert the shopping complex into the collection
    await collection.insertOne(shoppingComplex);

    console.log('Shopping Complex saved to the database successfully!');

    // Retrieve the shopping complex from the collection
    const retrievedShoppingComplex = await collection.findOne({});
    console.log('Retrieved Shopping Complex:', retrievedShoppingComplex);
  } catch (err) {
    console.error('Error occurred while saving/retrieving the shopping complex:', err);
  } finally {
    // Close the client connection
    await client.close();
  }
}

const shoppingComplex = new ShoppingComplex();
createShop();
