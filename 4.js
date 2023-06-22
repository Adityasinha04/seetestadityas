const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Define the schema for the "Rent" collection
const rentSchema = new mongoose.Schema({
  name: String,
  rent: Number
});

// Create a model for the "Rent" collection
const Rent = mongoose.model('Rent', rentSchema);

async function main() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb+srv://aditya22:12345@clusteradi.yvgtwx7.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    let running = true;

    while (running) {
      console.log('\n1. Create');
      console.log('2. Read');
      console.log('3. Update');
      console.log('4. Delete');
      console.log('5. Exit');

      const choice = parseInt(prompt('Enter your choice: '));

      switch (choice) {
        case 1:
          const newData = promptForData();
          await createRent(newData);
          break;
        case 2:
          await readRent();
          break;
        case 3:
          const queryToUpdate = promptForQuery();
          const updatedData = promptForData();
          await updateRent(queryToUpdate, updatedData);
          break;
        case 4:
          const queryToDelete = promptForQuery();
          await deleteRent(queryToDelete);
          break;
        case 5:
          running = false;
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    }

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createRent(data) {
  try {
    const rent = new Rent(data);
    await rent.save();
    console.log('Document inserted successfully');
  } catch (error) {
    console.error('Failed to insert document', error);
  }
}

async function readRent() {
  try {
    const rents = await Rent.find();
    console.log('Documents:', rents);
  } catch (error) {
    console.error('Failed to fetch documents', error);
  }
}

async function updateRent(query, updateData) {
  try {
    const updatedRent = await Rent.findOneAndUpdate(query, updateData, {
      new: true
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Failed to update document', error);
  }
}



function promptForData() {
    
  const data = {};

  data.name = prompt('Enter name: ');
  data.rent = parseFloat(prompt('Enter rent: '));

  return data;
}

function promptForQuery() {
  const query = {};

  query.name = prompt('Enter name to query: ');

  return query;
}

// Calling the main function
main();