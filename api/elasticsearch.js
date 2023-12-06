/* eslint-disable no-await-in-loop */
const { Client } = require('@elastic/elasticsearch')

const elasticUrl = 'http://admin:123456@localhost:9200'
const client = new Client({ node: elasticUrl })

// Function 1: Ping Elasticsearch
async function pingElasticsearch() {
    try {
        const body = await client.ping()
        console.log(`Elasticsearch cluster is available: ${body}`)
    } catch (error) {
        console.error('Error pinging Elasticsearch:', error)
    }
}

// Function 2: Index a Document
async function indexDocument(indexName, document) {
    try {
        const { body: indexResponse } = await client.index({
            index: indexName,
            body: document
        })
        console.log(`Document added to index ${indexName}:`, indexResponse)
    } catch (error) {
        console.error('Error indexing document:', error)
    }
}

// Function 3: Search for Documents
async function searchDocuments(indexName, query) {
    try {
        const { body: searchResponse } = await client.search({
            index: indexName,
            q: query
        })
        console.log('Documents found:', searchResponse.hits.hits)
    } catch (error) {
        console.error('Error searching documents:', error)
    }
}

// Function 4: Update a Document
async function updateDocument(indexName, documentId, updatedFields) {
    try {
        const { body: updateResponse } = await client.update({
            index: indexName,
            id: documentId,
            body: { doc: updatedFields }
        })
        console.log(`Document updated in index ${indexName}:`, updateResponse)
    } catch (error) {
        console.error('Error updating document:', error)
    }
}

// Function 5: Delete a Document
async function deleteDocument(indexName, documentId) {
    try {
        const { body: deleteResponse } = await client.delete({
            index: indexName,
            id: documentId
        })
        console.log(`Document deleted from index ${indexName}:`, deleteResponse)
    } catch (error) {
        console.error('Error deleting document:', error)
    }
}

async function insertData() {
    const indexName = 'your_index_name' // Thay thế bằng tên index của bạn
    const recordsCount = 1000

    for (let i = 1; i <= recordsCount; i += 1) {
        const document = {
            user: `User ${i}`,
            message: `Hello, Elasticsearch! Record ${i}`
        }

        try {
            const { body: indexResponse } = await client.index({
                index: indexName,
                body: document
            })
            console.log(
                `Document ${i} added to index ${indexName}:`,
                indexResponse
            )
        } catch (error) {
            console.error(`Error adding document ${i}:`, error)
        }
    }
}
insertData()

// Gọi các hàm theo nhu cầu của bạn:
// pingElasticsearch();
// indexDocument('your_index_name', { user: 'John Doe', message: 'Hello, Elasticsearch!' });
// searchDocuments('your_index_name', 'Hello');
// updateDocument('your_index_name', 'document_id_to_update', { message: 'Updated message' });
// deleteDocument('your_index_name', 'document_id_to_delete');
