// import { MongoClient } from 'mongodb'
// import { Product } from '../types/Product'
// import { ObjectId } from 'mongodb'

// const url = 'mongodb://localhost:rajdb'
// const client = new MongoClient(url)

// const insertProduct = async () => {
//   try {
//     await client.connect()
//     console.log('Connected to the database')

//     const db = client.db('rajdb')
//     console.log('Database selected:', db.databaseName)

//     const productsCollection = db.collection<Product>('products')
//     console.log('Collection selected:', productsCollection.collectionName)

//     const result = await productsCollection.insertOne({
//       _id: new ObjectId().toString(),
//       name: 'Washing Machine',
//       url: 'Washing-Machine',
//       image: '../productImages/appliances/washing_machine.png',
//       category: 'Appliances',
//       brand: 'Hanabishi',
//       price: 40000,
//       stockCount: 45,
//       description:
//         'Effortlessly clean your clothes with our advanced washing machine, featuring quick cycles, energy efficiency, and a sleek, modern design.',
//       rating: 9,
//       numberOfReviews: 24,
//     })

//     console.log('Inserted product into the collection:', result.insertedId)
//   } catch (error) {
//     console.error('Error occurred:', error)
//   } finally {
//     await client.close()
//     console.log('Connection closed')
//   }
// }

// insertProduct()
// import mongoose from 'mongoose'
// import { Collection } from 'mongoose'
// import { sampleProduct } from '../data'

// mongoose
//   .connect('mongodb://0.0.0.0:rajdb')
//   .then(() => {
//     console.log('Ready to input data.')
//   })
//   .catch(() => {
//     console.log('Connection failed')
//   })
// Collection.insertMany(sampleProduct)
import { MongoClient, ObjectId } from 'mongodb'

const uri = 'mongodb://localhost:rajdb'
const client = new MongoClient(uri)

export async function insertData() {
  try {
    await client.connect()
    const database = client.db('rajdb')
    const collection = database.collection('products')

    const result = await collection.insertOne({
      _id: new ObjectId(),
      name: 'Washing Machine',
      url: 'Washing-Machine',
      image: '../productImages/appliances/washing_machine.png',
      category: 'Appliances',
      brand: 'Hanabishi',
      price: 40000,
      stockCount: 45,
      description:
        'Effortlessly clean your clothes with our advanced washing machine, featuring quick cycles, energy efficiency, and a sleek, modern design.',
      rating: 9,
      numberOfReviews: 24,
    })

    console.log('Inserted product into the collection:', result.insertedId)
  } catch (error) {
    console.error('Error occurred:', error)
  } finally {
    await client.close()
    console.log('Connection closed')
  }
}

insertData()
