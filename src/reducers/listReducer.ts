import { Item } from "@/types/Item";

type AddAction = {
    type: "add";
    payload: {
        id: number;
        name: string;
        lastName: string;
        role: string;
        number: string;  
        done: boolean;
    };
}

type EditTextAction = {
    type: 'editText';
    payload: Item;
}


type removeAction = {
    type: 'remove';
    payload: {
        id: number;
    };
}

type SetListAction = {
    type: 'setList';
    payload: Item[];
  }

type ListActions = AddAction | EditTextAction | removeAction | SetListAction;

export const listReducer = (list: Item[], action: ListActions) => {
    // Executar alguma ação
    switch(action.type) {
        case 'add':
            return [...list, {
                id: list.length,
                name: action.payload.name,
                lastName: action.payload.lastName,
                role: action.payload.role,
                number: action.payload.number,
                done: false,
            }];
        
        case 'setList':
            return action.payload;    

        case 'editText':
            return list.map(item => {
                if (item.id === action.payload.id) {
                    return {
                    ...item,
                    name: action.payload.name || item.name,
                    lastName: action.payload.lastName || item.lastName,
                    role: action.payload.role || item.role,
                    number: action.payload.number || item.number,
                    }
                }
                return item;
            });
        
        case 'remove':
            return list.filter(item => item.id !== action.payload.id)
        default:
            return list;
    }
}