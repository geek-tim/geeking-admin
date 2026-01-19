import { request, RequestOptions, MockDataManager } from '../utils'
const testManager = new MockDataManager('mock_menus', [])

export const tests = [
    request.get('/api/tests', 'get success!'),
    request.post('/api/tests', 'post success!'),
    request.get('/api/tests/withoutToken', 'withoutToken success!'),
    request.post('/api/tests/postFormAPI', 'postFormAPI success!'),
    request.delete('/api/tests/:id', testManager),
    request.put('/api/tests/:id', 'put success!'),
]
