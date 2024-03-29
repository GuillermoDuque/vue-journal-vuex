import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = ( initialState) =>
 createStore({
    modules:{
        journal: {
            ...journal,
            state:{...initialState}
        }
    }
 })


describe('Vuex- Pruebas en el Journal Module', () =>{

    test('este es el estado inicial, debe de tener este state',()=>{
        
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
        
    })

    test('mutation: setEntries',() =>{
        const store = createVuexStore({isLoading: true, entries: []})
        
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()


        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(4)
    })


    test('mutation: updateEntries',()=>{
        const store = createVuexStore(journalState)

        const updatedEntry =  {
            id: "-NMY-pIE2cTCj8EvyPlU",
            date: 1674550917901,
            text: "Hola mundo desde pruebas",
          }

          store.commit('journal/updateEntries', updatedEntry)

          const storeEntries = store.state.journal.entries

          expect(storeEntries.length).toBe(2)
          expect(storeEntries.find(e=> e.id === updatedEntry.id)).toEqual(updatedEntry)

        
    })

    test('mutation: addEntries deleteEntry',()=>{

        const store = createVuexStore(journalState)

        store.commit('journal/addEntries',{id:'ABC-123', text:'Hola Mundo'})

        var stateEntries = store.state.journal.entries
        
        expect(stateEntries.length).toBe(3)
        expect( stateEntries.find( e => e.id ==='ABC-123')).toBeTruthy

        store.commit('journal/deleteEntry', 'ABC-123')
        stateEntries = store.state.journal.entries

        expect(stateEntries.length).toBe(2)
        expect( stateEntries.find( e => e.id ==='ABC-123')).toBeFalsy()
        
    })


    test('getters: getEntriesByTerm getEntryById', () =>{
        const store = createVuexStore(journalState)
        
        const[entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([entry2])

        
        expect(store.getters['journal/getEntriesById'](entry1.id)).toEqual(entry1)
    })

    test('actions: loadEntries', async()=>{
        const store = createVuexStore({ isLoading: true, entries:[]})
        
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(3)
    })

    test('actions: updateEntries', async()=>{
        const store = createVuexStore(journalState)
        
        const updatedEntry = {
            id: "-NMY-pIE2cTCj8EvyPlU",
            date: 1674550917901,
            text: "Hola mundo desde mock data test"
          }
        
        await store.dispatch('journal/updateEntries', updatedEntry)
        const entries =store.state.journal.entries
        expect(entries.length).toBe(2)
        expect(entries.find( e=> e.id === updatedEntry.id)).toEqual({ id: "-NMY-pIE2cTCj8EvyPlU",
        date: 1674550917901,
        text: "Hola mundo desde mock data test"})
    })

    test("actions: createEntries deleteEntry", async ()=>{
        const store = createVuexStore(journalState)

        const newEntry={ date: 1627077227978, text: 'Nueva entrada desde las pruebas'}
        
        const id=await store.dispatch('journal/createEntries', newEntry)

        expect(typeof id).toBe('string')
        
        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect(store.state.journal.entries.find(e=> e.id === id)).toBeFalsy()
    })
})