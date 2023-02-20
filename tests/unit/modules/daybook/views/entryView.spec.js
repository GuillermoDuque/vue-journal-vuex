import EntryView from '@/modules/daybook/views/EntryView.vue'
import Swal from "sweetalert2";
import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../mock-data/test-journal-state"
import { shallowMount } from "@vue/test-utils"

const createVuexStore = (initialState) =>
    createStore({
        modules:{
            journal:{
                ...journal,
                state:{ ...initialState}
            }
        }
    })

jest.mock('sweetalert2', () =>({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()    
}))
    
describe('Pruebas en el EntryView',() =>{

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() =>{
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView,{
            props:{
                id: '-NMcH-K6kW8buD0t5sTH'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })
    
    test('debe de sacar al usuario porque el id no existe',() =>{

        const wrapper = shallowMount( EntryView,{

            props:{
                id: 'Este Id no existe en el Store'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry'})
        
    })

    test('debe de mostrar la entrada correctamente', () =>{
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalledWith({ name: 'no-entry'})
    })

    test('debe de borrar la entrada y sair', () =>{
    
        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true}))
        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: "¿Estás seguro?",
            text: "Una vez borrado, no se puede recuperar",
            showDenyButton: true,
            confirmButtonText: "Sí, estoy seguro",
          }) 
    })
})