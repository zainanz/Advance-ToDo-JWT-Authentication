import { format } from 'date-fns';

export default function CompletedList({data}){
 return ( <div className="completed-todo overflow-scroll mx-3">
        <h5 style={{position:'sticky'}}className="sofadi-one-regular text-center m-2 mb-4">Todos History</h5>
        <div>
          {
            data.map( todo => {
              return (

                <div key={todo.id} className="my-1 d-flex align-items-center justify-content-between w-100 bg-white px-3"style={{height:'30px'}}>
                  <span className="playwrite-de-grund text-secondary">{todo.content}</span>
                  <span style={{fontSize: "0.8em"}} className="playwrite-de-grund text-secondary">{format(Date.parse(todo.updated_at), 'EEEE, dd MMMM')}</span>
                </div>
              )
            }).reverse()
          }
        </div>
      </div>
    )

}
