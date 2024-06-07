import { User } from '../shared/types'

export async function getUsers(): Promise<User[]> {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return await res.json()
    } catch (e) {
        throw new Error('Could not get users')
    }
}
