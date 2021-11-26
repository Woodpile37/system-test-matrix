import React from 'react'
import {
  StackLayout,
  Table,
  Text,
  TruncatedText,
  CenterLayout,
  BoxLayout,
} from '@filecoin/ui'
import { Behavior } from '@filecoin/types'

import { PageContainer } from '@/containers/PageContainer'
import { getButton } from '@/pages/tests'

interface Props {
  behavior: Behavior
}

export const BehaviorModal = (props: Props) => {
  const {
    state: { model },
  } = PageContainer.useContainer()

  const tests = model.getAllTests()

  const getLinkedBehaviors = tests.filter(test =>
    test.linkedBehaviors
      .map(behavior => behavior.id)
      .includes(props.behavior?.id),
  )

  const tableColumns = {
    path: {
      header: ' ',
      Cell: ({ data: { path } }) => {
        return <Text>{path}</Text>
      },
    },
    functionName: {
      header: ' ',
      Cell: ({ data: { functionName } }) => {
        return <Text as={TruncatedText}>{functionName}</Text>
      },
    },
    testKind: {
      header: ' ',
      width: 160,
      Cell: ({ data: { kind } }) => {
        return <Text>{kind}</Text>
      },
    },
    score: {
      header: ' ',
      width: 160,
      Cell: ({ data: { status } }) => {
        return <Text>{getButton(status)}</Text>
      },
    },
  }

  if (!getLinkedBehaviors?.length) {
    return (
      <BoxLayout gap={1}>
        <CenterLayout centerText>
          <Text>There is no linked tests for this behavior.</Text>
        </CenterLayout>
      </BoxLayout>
    )
  }

  return (
    <StackLayout gap={2}>
      {props.behavior && (
        <StackLayout gap={0.5}>
          <Text type={'heading 5'}>{props.behavior.id}</Text>
          <Text>{props.behavior.description}</Text>
        </StackLayout>
      )}
      <StackLayout gap={1}>
        <Text type={'subtitle l'}>Linked tests</Text>
        <Table
          variant={'light'}
          data={getLinkedBehaviors}
          columns={tableColumns}
        />
      </StackLayout>
    </StackLayout>
  )
}
