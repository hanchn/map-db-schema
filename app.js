import { mapTableStructure } from './conn.js'

const structure = await mapTableStructure()
console.log('structure ', structure)