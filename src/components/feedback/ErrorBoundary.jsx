import { Component } from 'react'
import FallbackPage from './FallbackPage'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught rendering error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <FallbackPage />
    }

    return this.props.children
  }
}
