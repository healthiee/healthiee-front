import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Atom } from '../../assets/images/DevelopmentIllustrations/atom.svg'
import { ReactComponent as Help } from '../../assets/images/help.svg';
import { format, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import HelpIconModal from './HelpIconModal';

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
`
const AtomImg = styled(Atom)`
  width: 88px;
  height: 88px;
  margin-right: 64px;
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
background-color: rgba(255, 255, 255, 0.5);
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
const Achievement = styled.div`
`
const AchieveBar = styled.div`
  width: 301px;
  height: 25px;
  background-color: #B7FF62;
  border-radius: 13px;
  opacity: 0.4;
  margin: 9px 0 4px;
`
const DescriptionXsm = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.gray};
`
const Event = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const day = [];
  let days = [];
  let startDay = startDate;
  let formattedDate = "";

  // Modal
  const [modal, setModalOpen] = useState(false);

  const week = daysOfWeek.map((day, i) => {
    return (
      <Week key={i}>{day}</Week>
    )
  })

  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(startDay, "d");
      const isToday = isSameDay(startDay, currentDate);
      startDay = addDays(startDay, 1);

      days.push(
        <DayWrapper key={formattedDate} style={{ backgroundColor: isToday ? 'rgba(0, 88, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}>
          <Day>
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
          <CheckBox type="checkbox" />
        </Top>
        <Line />
        <Bottom>
          <ImgAndIcon>
            <AtomImg />
            <DescriptionMd>지금 나는 원자에요</DescriptionMd>
          </ImgAndIcon>
          <HelpIcon onClick={showModal}/>
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

      <Achievement>
        <DescriptionMd>• 이번달 달성율</DescriptionMd>
        <AchieveBar></AchieveBar>
        <DescriptionXsm>75%(20일 중 15일 성공)</DescriptionXsm>
      </Achievement>
    </EventWrapper>
  )
};

export default Event;