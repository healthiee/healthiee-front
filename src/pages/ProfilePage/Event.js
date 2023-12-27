import { useState, useEffect } from 'react';
import styled from 'styled-components';
import atom from '../../assets/images/DevelopmentIllusts/atom.png';
import molecule from '../../assets/images/DevelopmentIllusts/molecule.png';
import sapling from '../../assets/images/DevelopmentIllusts/sapling.png';
import seed from '../../assets/images/DevelopmentIllusts/seed.png';
import sprout from '../../assets/images/DevelopmentIllusts/sprout.png';
import tree from '../../assets/images/DevelopmentIllusts/tree.png';
import { ReactComponent as Help } from '../../assets/images/help.svg';
import { format, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isSameDay, isSameMonth, getDaysInMonth } from 'date-fns';
import HelpIconModal from './HelpIconModal';
import axios from 'axios';

// TodayWorkout
const EventWrapper = styled.div`
  padding: 20px 24px;
`
const TodayWorkout = styled.div`
  width: 312px;
  height: 202px;
  background-color: rgba(251, 255, 147, 0.4); 
  box-shadow: 0px 5px 6px #00000029;
  border-radius: 30px;
  margin-bottom: 61px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 28px 18px;
`
const DescriptionMd = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray};
`
const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #707070;
  border-radius: 8px;
  appearance: none;
  background-color: #FFFFFF;

  &:checked {
    background-color: ${({ theme }) => theme.colors.orange}; 
  }
`
const Line = styled.div`
  width: 300px;
  border: 2px solid #D3D3D3;
  background-color: #D3D3D3;
  margin-left: 5.5px;
`
const Bottom = styled.div`
  display: flex;
  padding: 16px 28px;
  justify-content: flex-end;
`
const ImgAndIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 48px;
`
const AtomImg = styled.div`
  width: 88px;
  height: 88px;
  background: url(${atom});
  margin-bottom: 10px;
  border-radius: 20px;
  box-shadow: 0px 3px 6px #00000029;
`
const HelpIcon = styled(Help)`
  width: 20px;
  height: 20px;
  fill : ${({ theme }) => theme.colors.gray};
`

// Calendar
const Calendar = styled.div`
  width: 312px;
  height: ${props => props.large ? '310px' : '270px'};
  background-color: rgba(177, 231, 255, 0.4);
  box-shadow: 0px 5px 6px #00000029;
  border-radius: 30px;
  position: relative;
  padding: 37px 16px 11px;
  margin-bottom: 12px;
`
const Month = styled.div`
  position: absolute;
  top: -21px;
  width: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  background-color: #B2E7FF;
  border-radius: 20px;
  margin: 0 0 18px 83px;
`
const DescriptionLg = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray};
`
const WeekLayOut = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`
const DayLayOut = styled.div`
  display: flex;
  flex-direction: column;
`
const Week = styled.p`
  flex: 1; 
  text-align: center;
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`
const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 35px;
  border-radius: 50%;
`
const Day = styled.p`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.gray};
`
const DayBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 7px;
`

// Achievement 
const AchieveBar = styled.div`
  width: 301px;
  height: 25px;
  background-color: rgba(183, 255, 98, 0.4);
  border-radius: 13px;
  margin: 9px 0 4px;
`
const FillerStyles = styled.div`
  width: ${({ $fillPercentage }) => `${$fillPercentage}%`};
  height: 100%;
  border-radius: 13px;
  background-color: rgba(183, 255, 98, 1);
`
const DescriptionXsm = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`
const Event = () => {
  const getUTCDate = () => {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }
  const [currentDate, setCurrentDate] = useState(getUTCDate());
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const daysOfMonth = getDaysInMonth(currentDate);
  const [workouts, setWorkouts] = useState([]);
  const [workoutTotalCountForMonth, setWorkoutTotalCountForMonth] = useState(0);

  const isWorkoutExist = (date) => {
    return workouts.some(workout =>
      isSameDay(new Date(workout.workoutDate), date)
    );
  };

  const day = [];
  let days = [];
  let startDay = startDate;
  let formattedDate = "";

  const today = format(currentDate, "yyyy-MM-dd");
  const getCheckboxState = () => {
    const savedState = localStorage.getItem(`checkbox-${today}`);
    const savedDate = localStorage.getItem('checkbox-date');

    if(savedDate !== today) {
      return false;
    }

    return savedState === 'true';
  };
  const [isChecked, setIsChecked] = useState(getCheckboxState());
  const [modal, setModalOpen] = useState(false);

  useEffect(() => {
    setIsChecked(getCheckboxState());
  }, [])

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://prod.healthiee.net/v1/workouts', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        })
        setWorkoutTotalCountForMonth(res.data.data.workoutTotalCountForMonth);
        setWorkouts(res.data.data.workouts);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWorkouts();
  }, [])


  const handleChange = async (e) => {
    localStorage.setItem(`checkbox-${today}`, e.target.checked);
    localStorage.setItem('checkbox-date', today);
    setIsChecked(e.target.checked);

    if (e.target.checked) {
      try {
        const res = await axios.post('http://prod.healthiee.net/v1/workouts', {}, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        const newWorkout = {
          workoutId: res.data.data.workoutId,
          workoutDate: today
        };
        setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
        setWorkoutTotalCountForMonth(prevCount => prevCount + 1);
      } catch (err) {
        console.error(err);
      }
    } else {
      const todayWorkout = workouts.find(workout => workout.workoutDate === today);
      try {
        await axios.delete(`http://prod.healthiee.net/v1/workouts/${todayWorkout.workoutId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwic3ViIjoiNzM2Y2Y0NTQtMjgxOC00ZmQ5LWEwNzctMzAwYjZmNWVmZTY0IiwiaWF0IjoxNjk5ODUyMjU4LCJleHAiOjE3ODYyNTIyNTh9.4-aiUFJpIEmhUlehg5YPVHPYjTQ7GP-2jTV63JYqXho`
          }
        });
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.workoutId !== todayWorkout.workoutId));
        setWorkoutTotalCountForMonth(prevCount => prevCount > 0 ? prevCount - 1 : 0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const successRate = ((workoutTotalCountForMonth / daysOfMonth) * 100).toFixed();
  const week = daysOfWeek.map((day, i) => {
    return (
      <Week key={i}>{day}</Week>
    )
  })

  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(startDay, "d");
      const isToday = isSameDay(startDay, currentDate);
      const isCurrentMonth = isSameMonth(startDay, currentDate);
      const isWorkoutDay = isWorkoutExist(startDay);

      startDay = addDays(startDay, 1);
      days.push(
        <DayWrapper
          key={formattedDate}
          style={{
            backgroundColor: isToday
              ? 'rgba(0, 88, 255, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
            border: isToday && isChecked
              ? '1px solid #0058FF'
              : !isToday && isWorkoutDay
                ? '1px solid rgba(0, 88, 255, 0.5)'
                : 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <Day
            style={{
              color: isCurrentMonth
                ? '#717171'
                : 'transparent',
            }}
          >
            {formattedDate}
          </Day>
        </DayWrapper>
      )
    };
    day.push(<DayBox key={day.length}>{days}</DayBox>)
    days = [];
  };

  const showModal = () => {
    setModalOpen(true);
  }

  return (
    <EventWrapper>
      <TodayWorkout>
        <Top>
          <DescriptionMd>오늘 운동하셨나요?</DescriptionMd>
          <CheckBox
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
        </Top>
        <Line />
        <Bottom>
          <ImgAndIcon>
            <AtomImg />
            <DescriptionMd>지금 나는 원자에요</DescriptionMd>
          </ImgAndIcon>
          <HelpIcon onClick={showModal} />
          {modal && <HelpIconModal setModalOpen={setModalOpen} />}
        </Bottom>
      </TodayWorkout>
      <Calendar large={day.length > 5}>
        <Month>
          <DescriptionLg>{format(currentDate, 'M')}월</DescriptionLg>
        </Month>
        <WeekLayOut>{week}</WeekLayOut>
        <DayLayOut>{day}</DayLayOut>
      </Calendar>
      <DescriptionMd>• 이번달 달성율</DescriptionMd>
      <AchieveBar>
        <FillerStyles $fillPercentage={((workoutTotalCountForMonth / daysOfMonth) * 100).toFixed()} />
      </AchieveBar>
      <DescriptionXsm>{successRate}%({daysOfMonth}일 중 {workoutTotalCountForMonth}일 성공)</DescriptionXsm>
    </EventWrapper>
  )
};

export default Event;