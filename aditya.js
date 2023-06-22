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
  
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const shoppingComplex = new ShoppingComplex();
  
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
          }
        });
      });
    });
  }
  
  createShop();
  