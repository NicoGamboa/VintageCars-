import React from 'react';
import DatePicker,{registerLocale} from 'react-datepicker';
import {useState} from 'react';
import './reservaCalendario.css'
import { useContext } from 'react';
import { FechaContext } from '../../context/UseContext';
import parseISO from 'date-fns/parseISO';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import { useEffect } from 'react';



function ReservaCalendario ({inline}){

  const {desabilitar}=useContext(FechaContext)
  const {setStartDate1}=useContext(FechaContext)
  const {setEndDate1}=useContext(FechaContext)
  const{setSelectedDates}=useContext(FechaContext)
  const{selectedDates}=useContext(FechaContext)

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

    const addDays=[
        new Date(2022, 10, 14),
        new Date(2022, 11, 14)
    ]

    
   
  


//nueva logica calendario

const [dateRange, setDateRange] = useState([null,null]);
 const [startDate, endDate] = dateRange;
const[dateRange1, setDateRange1] = useState([null, null]);
  const onCnangeCalendar = (item) =>{
    const[start,end]= item;
    setStartDate1(start);
    setEndDate1(end);
    setDateRange(item);
    setDateRange1(item);
   setSelectedDates(item);
   
 
  }



  useEffect(()=>{
    if (selectedDates){
      setDateRange(selectedDates)
    }
  },[selectedDates])
   

   



//logica para bloquear los dias del calendario

const arrayExcluded =[];
    let exclution=[];
    const fechas=[{inicioReserva: '2022-12-03',finReserva: '2022-12-07'},{
        inicioReserva: '2022-12-01',finReserva: '2022-12-02'
       }]
    
    
    const getExcluded =()=>{
       desabilitar?.forEach(reservas=>{
            arrayExcluded.push(
              eachDayOfInterval({
                start: parseISO(reservas.inicioReserva),
               end: parseISO(reservas.finReserva),
                
              })
              
            
            )
           
          }
         
          )
          exclution = [].concat.apply([], arrayExcluded);
    
    }
    getExcluded();



    return (
    <div>
            <DatePicker 
            placeholderText='Elige Fecha'
            className='calendarioDoble'
            selected={startDate}
            onChange={(item) => onCnangeCalendar(item)}
            minDate={new Date()}
            locale='es'
            dateFormat="dd-MM-yyyy"
            startDate={startDate}
            endDate={endDate}
            selectsRange
            excludeDates={exclution}
            selectsDisabledDaysInRange
            monthsShown={2}
            inline={inline}
            
            />
          
    </div>
    );
  };

export default ReservaCalendario
